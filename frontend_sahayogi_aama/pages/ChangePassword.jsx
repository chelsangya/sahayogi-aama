import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editUserPassword } from '../apis/Api';
import Navbar from '../components/Navbar';

const ChangePassword = () => {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentPassword(user.password);
    }, [id, user.password]);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            toast.error('Please confirm your new password');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('currentPassword', currentPassword);
            formData.append('newPassword', newPassword);

            editUserPassword(id, formData).then((res) => {
                if (res.data.success == true) {
                    toast.success(res.data.message)
                }
                else {
                    toast.error(res.data.message)
                }
            }).catch(err => {
                toast.error("Server Error")
            })
        } catch (error) {
            console.log('Error');
            toast.error('Hello');
        }
    };


    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear();
        navigate('/')
    };

    return (
        <>
            <Navbar />
            <main className='md:flex md:flex-row flex-col w-full jutsify-center items-start py-10'>
                <div className="md:w-[20%] w-[95%] py-4 flex flex-col items-center gap-y-5">
                    <Link to={'/profile'} className='w-[90%] border-2 text-center py-3 rounded-md text-lg bg-black text-white'>Edit Profile</Link>
                    <Link to={'/change-password'} className='w-[90%] border-2 text-center py-3 rounded-md text-lg bg-black text-white'>Change password</Link>
                    <Link to={'/favourite-list'} className='w-[90%] border-2 text-center py-3 rounded-md text-lg bg-black text-white'>Favourites List</Link>
                    <button onClick={handleLogout} className='w-[90%] border-2 text-center py-3 rounded-md text-lg bg-black text-white'>Logout</button>
                </div>
                <div className="md:w-[60%] w-[95%] py-4">
                    <form className='flex flex-col md:w-[70%] w-[100%] mx-auto py-2 text-black px-10 gap-y-1'>
                        <h1 className='text-2xl'>Password Settings</h1>
                        <label className='mt-5 text-md'>Current password</label>
                        <input onChange={(e) => setCurrentPassword(e.target.value)} className='w-full h-12 border bg-neutral-200 text-black px-3 rounded-lg' type="password" />
                        <label className='mt-5 text-md'>New Password</label>
                        <input onChange={(e) => setNewPassword(e.target.value)} className='w-full h-12 border bg-neutral-200 text-black px-3 rounded-lg' type="tel" />
                        <label className='mt-5 text-md'>Confirm new Password</label>
                        <input onChange={(e) => setConfirmNewPassword(e.target.value)} className='w-full h-12 border bg-neutral-200 text-black px-3 rounded-lg' type="address" />
                        <button onClick={handleSubmit} className='w-full h-12 border bg-black text-white px-3 rounded-lg mt-10'>Change password</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default ChangePassword