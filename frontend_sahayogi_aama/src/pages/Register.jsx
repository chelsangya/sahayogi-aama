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
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordHints, setPasswordHints] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    numbers: false,
    specialCharacters: false,
  });

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Check password strength using zxcvbn
    const result = zxcvbn(value);
    setPasswordStrength(result.score);

    // Update password hints
    setPasswordHints({
      length: value.length >= 6,
      lowercase: /[a-z]/.test(value),
      uppercase: /[A-Z]/.test(value),
      numbers: /\d/.test(value),
      specialCharacters: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure the password meets the policy
    if (passwordStrength < 1) {
      toast.error('Password is too weak.');
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
    if (score === 0) return 'Weak';
    if (score === 1) return 'Medium';
    return 'Strong';
  };

  const getPasswordStrengthColor = (score) => {
    if (score === 0) return '#ff4d4d'; // red
    if (score === 1) return '#FFA500'; // orange
    return '#00ff00'; // green
  };

  return (
    <>
      <main>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="logo">
            <img src="../assets/images/logo.png" alt="Logo" />
          </div>
          <br />
          <h1 className='text-black font-semibold text-2xl'>Register with us :</h1>
          <br />
          <div className='w-full'>
            <label htmlFor="fullname">Fullname</label>
            <input onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Sangya Koirala" required />
          </div>
          <div className="w-full mt-5">
            <label htmlFor="email">Email address</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="koiralasangya@gmail.com" required />
          </div>
          <div className="w-full mt-5">
            <label htmlFor="phone">Phone Number</label>
            <input onChange={(e) => setPhoneNumber(e.target.value)} type="tel" placeholder="9800000000" required />
          </div>
          <div className="w-full mt-5">
            <label htmlFor="address">Address</label>
            <input onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Kathmandu" required />
          </div>
          <div className="w-full mt-5">
            <label htmlFor="password">Password</label>
            <input onChange={handlePasswordChange} type="password" placeholder="**********" required />
            <div className="password-strength mt-2">
              <div
                style={{
                  width: `${(passwordStrength + 1) * 33.33}%`,
                  height: '6px',
                  backgroundColor: getPasswordStrengthColor(passwordStrength),
                  borderRadius: '5px',
                  transition: 'width 0.3s',
                }}
              />
            </div>
            <div className="password-strength-label mt-2 text-right">
              <p className={`text-sm ${passwordStrength === 2 ? 'text-green-500' : passwordStrength === 1 ? 'text-orange-500' : 'text-red-500'}`}>
                {getPasswordStrengthLabel(passwordStrength)}
              </p>
            </div>
            <div className="password-hints mb-3">
              <div>
                <span className="text-sm text-gray-800">Level:</span>
                <span className={`text-sm font-semibold ${passwordStrength === 2 ? 'text-green-500' : passwordStrength === 1 ? 'text-orange-500' : 'text-red-500'}`}>
                  {getPasswordStrengthLabel(passwordStrength)}
                </span>
              </div>

              <h4 className="my-2 text-sm font-semibold text-gray-800">
                Your password must contain:
              </h4>

              <ul className="space-y-1 text-sm text-gray-500">
                <li className={`flex items-center gap-x-2 ${passwordHints.length ? 'text-teal-500' : ''}`}>
                  <span className={passwordHints.length ? '' : 'hidden'}>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className={passwordHints.length ? 'hidden' : ''}>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </span>
                  Minimum number of characters is 6.
                </li>
                <li className={`flex items-center gap-x-2 ${passwordHints.lowercase ? 'text-teal-500' : ''}`}>
                  <span className={passwordHints.lowercase ? '' : 'hidden'}>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className={passwordHints.lowercase ? 'hidden' : ''}>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </span>
                  Should contain lowercase.
                </li>
                <li className={`flex items-center gap-x-2 ${passwordHints.uppercase ? 'text-teal-500' : ''}`}>
                  <span className={passwordHints.uppercase ? '' : 'hidden'}>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className={passwordHints.uppercase ? 'hidden' : ''}>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </span>
                  Should contain uppercase.
                </li>
                <li className={`flex items-center gap-x-2 ${passwordHints.numbers ? 'text-teal-500' : ''}`}>
                  <span className={passwordHints.numbers ? '' : 'hidden'}>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className={passwordHints.numbers ? 'hidden' : ''}>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </span>
                  Should contain numbers.
                </li>
                <li className={`flex items-center gap-x-2 ${passwordHints.specialCharacters ? 'text-teal-500' : ''}`}>
                  <span className={passwordHints.specialCharacters ? '' : 'hidden'}>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className={passwordHints.specialCharacters ? 'hidden' : ''}>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </span>
                  Should contain special characters.
                </li>
              </ul>
            </div>
          </div>
          <button className='w-full mt-7 bg-blue-500 text-white py-2 rounded'>Signup</button>
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