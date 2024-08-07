import PasswordValidator from 'password-validator';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import zxcvbn from 'zxcvbn';
import { registerUserApi } from '../apis/Api';
import '../styles/login.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();

  // Create a schema for password validation
  const schema = new PasswordValidator();
  schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Check password strength using zxcvbn
    const result = zxcvbn(value);
    setPasswordStrength(result.score);

    // Validate password
    if (!schema.validate(value)) {
      setPasswordError('Password must be 8-100 characters long, include uppercase and lowercase letters, digits, and no spaces.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure the password meets the policy
    if (passwordError) {
      return;
    }

    console.log(fullName, phoneNumber, email, password);

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    formData.append("password", password);

    registerUserApi(formData).then((res) => {
      console.log('Register Api');
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        navigate('/');
      }
    }).catch(err => {
      toast.error('Register Try-Catch Error');
      console.log(err.message);
    });
  };

  const getPasswordStrengthLabel = (score) => {
    switch (score) {
      case 0:
        return 'Very Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'So-so';
      case 3:
        return 'Good';
      case 4:
        return 'Great';
      default:
        return 'Very Weak';
    }
  };

  const getPasswordStrengthColor = (score) => {
    switch (score) {
      case 0:
        return '#ff4d4d'; 
      case 1:
      
        return '#FFA500'; 
      case 2:
        return '#FFFF00';
      case 3:
        return '#90EE90'; 
      case 4:
        return '#00ff00'; 
      default:
        return '#ff4d4d'; 
    }
  };

  return (
    <>
      <main>
        <form className="auth-form">
          <div className="logo">
            <img src="../assets/images/logo.png" alt="" />
          </div>
          <br />
          <h1 className='text-black font-semibold text-2xl'>Register with us :</h1>
          <br />
          <div className='w-full'>
            <label htmlFor="fullname">Fullname</label>
            <input onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Sangya Koirala" />
          </div>
          <div className="w-full mt-5">
            <label htmlFor="email">Email address</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="koiralasangya@gmail.com" />
          </div>
          <div className="w-full mt-5">
            <label htmlFor="phone">Phone Number</label>
            <input onChange={(e) => setPhoneNumber(e.target.value)} type="tel" placeholder="9800000000" />
          </div>
          <div className="w-full mt-5">
            <label htmlFor="address">Address</label>
            <input onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Kathmandu" />
          </div>
          <div className="w-full mt-5">
            <label htmlFor="password">Password</label>
            <input onChange={handlePasswordChange} type="password" placeholder="**********" />
            {passwordError && <p className="text-red-500 text-small">{passwordError}</p>}
            <div className="password-strength">
              <div
                style={{
                  width: `${(passwordStrength + 1) * 20}%`,
                  height: '100%',
                  backgroundColor: getPasswordStrengthColor(passwordStrength),
                  borderRadius: '5px',
                  transition: 'width 0.3s',
                }}
              />
            </div>
            <div className="password-strength-label mt-2 text-right">
              <p className={`text-sm ${passwordStrength >= 2 ? 'text-green-500' : 'text-red-500'}`}>
                {getPasswordStrengthLabel(passwordStrength)}
              </p>
            </div>
          </div>
          <button className='w-full mt-7 bg-blue-500 text-white py-2 rounded' onClick={handleSubmit}>Signup</button>
          <div className="for-route mt-5">
            <p>Already have an account? <Link to={'/'} className="text-blue-500">Login</Link></p>
          </div>
        </form>
        <br />
      </main>
    </>
  );
};

export default Register;
