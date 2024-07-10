import React, { useEffect, useState } from 'react';
import { addAamaApi, getAamaDetailsApi } from '../apis/Api';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AvailableAama = () => {
    const [aamas, setAamas] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'))

    const navigate = useNavigate();

    const [aamaImage, setAamaImage] = useState(null)
    const [name, setName] = useState(`${user.fullName}`)
    const [age, setAge] = useState('')
    const [time, setTime] = useState('')
    const [charge, setCharge] = useState('')
    const [experience, setExperience] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [language, setLanguage] = useState('')
    const [description, setDescription] = useState('')
    const [isVerified, setIsVerified] = useState('false')

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setAamaImage(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const loadingToast = toast.loading("Adding...")

        const formData = new FormData();
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

        addAamaApi(formData)
            .then((res) => {
                if (res.data.success === true) {
                    toast.dismiss(loadingToast)
                    toast.success('Form Submitted for verification');
                    navigate('/availableAama')
                    window.location.reload()
                } else {
                    toast.dismiss(loadingToast)
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error('Server Error');
            });
    };

    useEffect(() => {
        getAamaDetailsApi().then((res) => {
            setAamas(res.data.aama);
        });
    }, []);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            <Navbar />
            <main className='w-full flex flex-col py-10 justify-start items-start text-black'>

                <form className='w-[90%] border-2 rounded-md mx-auto'>
                    <input type="text" placeholder='Search here...' className='w-[95%] px-5 text-black outline-none' />
                    <button className='w-[5%] h-[50px] bg-black text-large text-white'><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>

                <div className="w-[90%] mt-10 mx-auto">
                    <div className="flex justify-between items-center w-full">
                        <h1 className='text-4xl font-medium text-red-600'>Available आमा</h1>
                        <button className='text-white text-lg px-3 py-2 bg-black rounded-md'>Sort by Price</button>
                    </div>
                    <div className="w-full flex flex-wrap justify-start gap-10 mt-10">
                        {aamas.filter((aama) => aama.isVerified === "true").map((data) => (
                            <div key={data._id} className="w-[300px] h-96 flex flex-col shadow-lg rounded-md overflow-hidden">
                                <img className='h-80' src={data.aamaImageUrl} alt={data.name} />
                                <div className="flex justify-between px-3 h-16 items-center">
                                    <div className="flex-col gap-y-2">
                                        <p className='text-md'>{data.name}</p>
                                        <p className='text-sm text-neutral-600'>{`${data.age} years`}</p>
                                    </div>
                                    <Link to={`/aamaDetails/${data._id}`} className='px-4 py-2 bg-black text-white'>View Details</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {showModal && (
                    <div className="fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-20 w-full h-screen overflow-y-auto">
                        <div className="bg-white p-8 rounded-md mt-80 w-[40%]">
                            <h3 className="text-lg font-semibold mb-4">Fill all details to be Aama</h3>
                            <form>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Upload Image</label>
                                        <input onChange={handleImageUpload} type="file" name="image" id="image" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Image..." required="" />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                        <input value={user.fullName} defaultValue={user.fullName} type="text" name="name" id="name" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Name..." required="" />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">Age</label>
                                        <input onChange={(e) => setAge(e.target.value)} type="text" name="age" id="age" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="30..." required="" />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900">Time</label>
                                        <input onChange={(e) => setTime(e.target.value)} type="text" name="time" id="time" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="PartTime/FullTime..." required="" />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="charge" className="block mb-2 text-sm font-medium text-gray-900">Charge</label>
                                        <input onChange={(e) => setCharge(e.target.value)} type="text" name="charge" id="charge" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="2000..." required="" />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900">Experience</label>
                                        <input onChange={(e) => setExperience(e.target.value)} type="text" name="experience" id="experience" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="5 years..." required="" />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="speciality" className="block mb-2 text-sm font-medium text-gray-900">Speciality</label>
                                        <input onChange={(e) => setSpeciality(e.target.value)} type="text" name="speciality" id="speciality" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Massage..." required="" />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900">Language</label>
                                        <input onChange={(e) => setLanguage(e.target.value)} type="text" name="language" id="language" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Nepali, Newari..." required="" />
                                    </div>
                                    <div className="col-span-2 hidden">
                                        <label htmlFor="isVerified" className="block mb-2 text-sm font-medium text-gray-900">Verification</label>
                                        <input defaultValue={"true"} onChange={(e) => setIsVerified(e.target.value)} type="text" readOnly name="verified" id="verified" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Yes/No..." required="" />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                        <textarea onChange={(e) => setDescription(e.target.value)} type="text" name="description" id="description" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full h-56" placeholder="Tell us about you..." required="" />
                                    </div>
                                </div>
                                <div className="flex justify-end w-full">
                                    <div className="flex gap-5">
                                        <button onClick={handleSubmit} type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Submit
                                        </button>
                                        <button onClick={toggleModal} className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                )}

            </main>
        </>
    );
}

export default AvailableAama;
