import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPasswordApi } from '../apis/Api';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email') || '';
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleChangePassword = (e) => {
        e.preventDefault();


        console.log(email, otp, newPassword)
        const formData = new FormData();
        formData.append("email", email)
        formData.append("otp", otp)
        formData.append("newPassword", newPassword)

        resetPasswordApi(formData).then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
                navigate('/')
            }
        }).catch((err) => {
            console.log(err)
            toast.error('Server Error');
        })
    };
    return (
        <>
            <main>
                <form className="auth-form">
                    <div className="logo">
                        <img src="../assets/images/logo.png" alt="" />
                    </div>
                    <br />
                    <h1 className='text-black font-semibold text-2xl'>Reset Password !!</h1>
                    <br />
                    <input value={email} hidden type="email" />
                    <div className='w-full'>
                        <label for="otp">OTP</label>
                        <input onChange={(e) => setOtp(e.target.value)} type="text" placeholder="1234" />
                    </div>
                    <div className='w-full mt-5'>
                        <label for="password">New password</label>
                        <input onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="********" />
                    </div>
                    <button className='mt-7' onClick={handleChangePassword}>Reset Password</button>
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

export default ResetPassword