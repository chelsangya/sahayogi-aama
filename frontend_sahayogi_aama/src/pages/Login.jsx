import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUserApi } from '../apis/Api'
import '../styles/login.css'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: email,
      password: password
    }
    loginUserApi(data).then((res) => {
      console.log('Login Api')
      if (res.data.success === false) {
        toast.error(res.data.message)
      } else {
        toast.success(res.data.message)
        // set token time
        localStorage.setItem("token", res.data.token);
        const jsonDecode = JSON.stringify(res.data.userData)
        // set user data
        localStorage.setItem("user", jsonDecode);
        window.location.replace('/availableAama')
      }
    }).catch(err => {
      console.log(err.message)
      toast.error('Login Try-Catch')
    })
  }
  return (
    <>
      <main>
        <form className="auth-form">
          <div className="logo">
            <img src="../assets/images/logo.png" alt="" />
          </div>
          <br />
          <h1 className='text-black font-semibold text-2xl'>Welcome back !!</h1>
          <br />
          <div className='w-full'>
            <label for="email">Email address</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="koiralasangya@gmail.com" />
          </div>
          <div className='w-full mt-5'>
            <label for="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="**********" />
          </div>
          <button className='mt-7' onClick={handleSubmit}>Login</button>
          <div className="for-route">
            <p>Don't have an account ? </p>
            <Link to={'/signup'}>Register</Link>
          </div>
        </form>
        <br />
      </main>
    </>
  )

}
export default Login