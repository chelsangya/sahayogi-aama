import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendOTPApi } from '../apis/Api';
import '../styles/login.css';

const RequestOTP = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')

    const handleSubmitOTP = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        sendOTPApi(formData).then((res) => {
            if (res.data.success == false) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
                navigate(`/reset-password?email=${email}`)
            }
        }).catch((err) => {
            console.log(err)
            toast.error('Server Error');
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
                    <h1 className='text-black font-semibold text-2xl'>Request OTP !!</h1>
                    <br />
                    <div className='w-full'>
                        <label for="email">Email address</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="koiralasangya@gmail.com" />
                    </div>
                    <button className='mt-7' onClick={handleSubmitOTP}>Request for OTP</button>
                    <div className="for-route">
                        <p>Back to login </p>
                        <Link to={'/'}>Login</Link>
                    </div>
                </form>
                <br />
            </main>
        </>
    )
}

export default RequestOTP