import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUserApi } from '../apis/Api'
import '../styles/login.css'

const Register = () => {

  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    // prevents reload
    e.preventDefault()
    console.log(fullName, phoneNumber, email, password);
    // making json data object
    const formData = new FormData()
    formData.append("fullName", fullName)
    formData.append("email", email)
    formData.append("phoneNumber", phoneNumber)
    formData.append("password", password)

    registerUserApi(formData).then((res) => {
      console.log('Register Api');
      if (res.data.success == false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        navigate('/login');
      }
    }).catch(err => {
      toast.error('Register Try-Catch Error');
      console.log(err.message);
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
          <h1 className='text-black font-semibold text-2xl'>Register with us :</h1>
          <br />
          <div className='w-full'>
            <label for="fullname">Fullname</label>
            <input onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Sangya Koirala" />
          </div>
          <div className="w-full mt-5">
            <label for="email">Email address</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="koiralasangya@gmail.com" />
          </div>
          <div className="w-full mt-5">
            <label for="phone">Phone Number</label>
            <input onChange={(e) => setPhoneNumber(e.target.value)} type="tel" placeholder="9800000000" />
          </div>
          <div className="w-full mt-5">
            <label for="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="**********" />
          </div>
          <button className='w-full mt-7' onClick={handleSubmit}>Signup</button>
          <div className="for-route" >
            <p>Already have an account ? </p>
            <Link to={'/login'} >Login</Link>
          </div>
        </form>
        <br />
      </main>
    </>
  )
}

export default Register