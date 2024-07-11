import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { addToContactApi } from '../apis/Api'
import { toast } from 'react-toastify'

const Contact = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('number', number)
        formData.append('message', message)

        addToContactApi(formData).then((res) => {
            if(res.data.success) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <Navbar />
            <main className='w-full flex flex-col justify-start mb-20'>
                <div className="w-full py-5 bg-neutral-200 text-center">
                    <h1 className='text-3xl text-black font-medium'>Contact Us</h1>
                </div>
                <div className="md:w-[90%] h-96 w-full md:px-0 px-2 my-7">
                    <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28263.277542054293!2d85.29551415!3d27.6891859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190a74aa1f23%3A0x74ebef82ad0e5c15!2z4KS44KSr4KWN4KSf4KS14KS-4KSw4KS_4KSV4KS-IOCkleCksuClh-CknA!5e0!3m2!1sne!2snp!4v1707137499980!5m2!1sne!2snp" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <form className='w-full h-auto md:px-10 px-2 mt-5 md:w-[90%] text-black flex flex-col'>
                    <p className='text-xl font-medium'>Fill this form to contact us :</p>
                    <input onChange={(e) => setName(e.target.value)} type='text' placeholder='Fullname...' className='mt-5 md:w-[500px] w-full rounded-md border-2 border-black px-3 py-2 h-[50px]' />
                    <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email address...' className='mt-5 md:w-[500px] w-full rounded-md border-2 border-black px-3 py-2 h-[50px]' />
                    <input onChange={(e) => setNumber(e.target.value)} type='tel' placeholder='Contact Number...' className='mt-5 md:w-[500px] w-full rounded-md border-2 border-black px-3 py-2 h-[50px]' />
                    <textarea onChange={(e) => setMessage(e.target.value)} type='text' placeholder='message...' className='mt-5 md:w-[500px] w-full rounded-md border-2 border-black px-3 py-2 h-[150px]' />
                    <button onClick={handleSubmit} className='md:w-[500px] w-full h-12 mt-10 bg-black text-white rounded-md' type="submit">Submit</button>
                </form>
            </main>
        </>
    )
}

export default Contact