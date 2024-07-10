import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editUserApi } from '../apis/Api';
import Navbar from '../components/Navbar';

const Profile = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        setFullName(user.fullName);
        setEmail(user.email);
        setAddress(user.address);
        setNumber(user.phoneNumber);
    }, [user.fullName, user.address, user.email, user.phoneNumber]);


    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const userFormData = new FormData();
        userFormData.append('fullName', fullName);
        userFormData.append('email', email);
        userFormData.append('address', address);
        userFormData.append('phoneNumber', number);
        console.log(fullName, email, address, number)

        editUserApi(userFormData)
            .then((userRes) => {
                if (userRes.data.success === true) {
                    toast.success(userRes.data.message);
                } else {
                    toast.error(userRes.data.message);
                }
            })
            .catch((userErr) => {
                console.error(userErr);
                toast.error('Server Error');
            });
    }

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear()
        navigate('/login')
    }

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
                        <h1 className='text-2xl'>Profile Settings</h1>
                        <img className='w-[100px] h-[100px] rounded-full mt-7' src="/assets/images/logo.png" alt="" />
                        <label className='text-md mt-5'>User image</label>
                        <input className='w-full py-2 border bg-neutral-200 text-black px-3 rounded-lg' type="file" />
                        <label className='mt-5 text-md'>Fullname</label>
                        <input value={fullName} onChange={(e) => setFullName(e.target.value)} className='w-full h-12 border bg-neutral-200 text-black px-3 rounded-lg' type="text" />
                        <label className='mt-5 text-md'>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full h-12 border bg-neutral-200 text-black px-3 rounded-lg' type="email" />
                        <label className='mt-5 text-md'>Phone Number</label>
                        <input value={number} onChange={(e) => setNumber(e.target.value)} className='w-full h-12 border bg-neutral-200 text-black px-3 rounded-lg' type="tel" />
                        <label className='mt-5 text-md'>Address</label>
                        <input value={address} onChange={(e) => setAddress(e.target.value)} className='w-full h-12 border bg-neutral-200 text-black px-3 rounded-lg' type="text" />
                        <button onClick={handleSubmit} className='w-full h-12 border bg-black text-white px-3 rounded-lg mt-10'>Submit</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Profile