import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUserApi } from '../apis/Api';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lockTimeRemaining, setLockTimeRemaining] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(null);

  useEffect(() => {
    if (lockTimeRemaining) {
      const timer = setInterval(() => {
        setLockTimeRemaining((prev) => (prev > 1 ? prev - 1 : null));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [lockTimeRemaining]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    };

    loginUserApi(data).then((res) => {
      if (res.data.success === false) {
        if (res.data.message.includes('Account locked')) {
          setLockTimeRemaining(res.data.lockTimeRemaining);
          toast.error(res.data.message);
        } else if (res.data.message.includes('The credentials do not match')) {
          setAttemptsLeft(res.data.attemptsLeft);
          toast.error(`${res.data.message}. Attempts left: ${res.data.attemptsLeft}`);
        } else {
          toast.error(res.data.message);
        }
      } else {
        toast.success(res.data.message);
        // set token time
        localStorage.setItem("token", res.data.token);
        const jsonDecode = JSON.stringify(res.data.userData);
        localStorage.setItem("user", jsonDecode);
        if (res.data.userData.isAdmin === true) {
          window.location.replace('/aamaList');
        } else {
          window.location.replace('/availableAama');
        }
      }
    }).catch(err => {
      console.log('Login Try-Catch');
      console.log(err.message);

      toast.error('Login Try-Catch');

    });
  };

  return (
    <>
      <main>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="logo">
            <img src="../assets/images/logo.png" alt="" />
          </div>
          <br />
          <h1 className='text-black font-semibold text-2xl'>Welcome back !!</h1>
          <br />
          <div className='w-full'>
            <label htmlFor="email">Email address</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="koiralasangya@gmail.com" required />
          </div>
          <div className='w-full mt-5'>
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="**********" required />
          </div>
          {lockTimeRemaining && (
            <div className="lock-message">
              Account locked. Try again in {lockTimeRemaining} seconds.
            </div>
          )}
          {attemptsLeft !== null && !lockTimeRemaining && (
            <div className="attempts-message">
              Attempts left: {attemptsLeft}
            </div>
          )}
          <button className='mt-7' type="submit" disabled={!!lockTimeRemaining}>Login</button>
          <div className="for-route">
            <p>Don't have an account? </p>
            <Link to={'/signup'} className="text-blue-500">Register</Link>
          </div>
          <div className="for-route">
            <p>Forgot your password? </p>
            <Link to={'/request-otp'} className="text-red-500">Click here...</Link>
          </div>
        </form>
        <br />
      </main>
    </>
  );
}

export default Login;

