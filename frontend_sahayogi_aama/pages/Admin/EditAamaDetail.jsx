import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getAamaDetailsById, updateAamaApi } from '../../apis/Api';
import AdminSideBar from '../../components/AdminSideBar';
import { toast } from 'react-toastify';

const EditAamaDetail = () => {
    const { id } = useParams()
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [charge, setCharge] = useState('');
    const [experience, setExperience] = useState('');
    const [time, setTime] = useState('');
    const [language, setLanguage] = useState('');
    const [description, setDescription] = useState('');
    const [aamaImage, setAamaImage] = useState(null);
    const [isVerified, setIsVerified] = useState('true')

    useEffect(() => {
        getAamaDetailsById(id).then((res) => {
            setAamaImage(res.data.aamaDetail.aamaImageUrl);
            setName(res.data.aamaDetail.name);
            setAge(res.data.aamaDetail.age);
            setSpeciality(res.data.aamaDetail.speciality);
            setCharge(res.data.aamaDetail.charge);
            setAge(res.data.aamaDetail.age);
            setExperience(res.data.aamaDetail.experience);
            setTime(res.data.aamaDetail.time);
            setLanguage(res.data.aamaDetail.language);
            setDescription(res.data.aamaDetail.description);
        });
    }, [id]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setAamaImage(file);
    }
    
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name);
        formData.append('age', age);
        formData.append('time', time);
        formData.append('charge', charge);
        formData.append('experience', experience);
        formData.append('speciality', speciality);
        formData.append('language', language);
        formData.append('description', description);
        formData.append('aamaImage', aamaImage);
        formData.append('isVerified', isVerified)
        
        updateAamaApi(id, formData).then((res) => {
            if(res.data.success) {
                toast.success(res.data.message)
                navigate('/aamaList')
            } else {
                toast.error(res.data.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

  return (
    <>
        <AdminSideBar />
            <div class="pl-1 sm:ml-64">
                <div>
                    <div class="flex items-center justify-center h-screen rounded bg-gray-50 dark:bg-gray-800">
                        <form class="w-[90%] mx-auto" >
                            <h1 className='text-2xl font-medium'>Edit Aama Details</h1>
                            <img className='w-[80px] h-[80px] rounded-full mt-5' src={aamaImage} alt="" />
                            <div class="relative z-0 w-full mb-5 mt-5 group">
                                <label class="block mb-5 text-sm font-medium text-gray-900 dark:text-white" for="large_size">Aama Image</label>
                                <input onChange={handleImageUpload} class="block w-full text-sm py-2.5 px-0 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="file" />
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="floating_name" id="floating_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input value={age} onChange={(e) => setAge(e.target.value)} type="text" name="floating_age" id="floating_age" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_age" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input value={time} onChange={(e) => setTime(e.target.value)} type="text" name="floating_time" id="floating_time" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_time" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Time</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input value={charge} onChange={(e) => setCharge(e.target.value)} type="text" name="floating_charge" id="floating_charge" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_charge" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Charge</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input value={experience} onChange={(e) => setExperience(e.target.value)} type="text" name="floating_experience" id="floating_experience" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_experience" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Experience</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input value={speciality} onChange={(e) => setSpeciality(e.target.value)} type="text" name="floating_speciality" id="floating_speciality" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_speciality" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Speciality</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input value={language} onChange={(e) => setLanguage(e.target.value)} type="text" name="floating_language" id="floating_language" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_language" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Language</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group hidden">
                                <input defaultValue={"true"} onChange={(e) => setIsVerified(e.target.value)} type="text" name="floating_verified" id="floating_verified" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_verified" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Verification</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="floating_description" id="floating_description" class="block py-10 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_description" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                            </div>

                            <button onClick={handleSubmit} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Aama</button>
                        </form >
                    </div>
                </div>
            </div>
    </>
  )
}

export default EditAamaDetail