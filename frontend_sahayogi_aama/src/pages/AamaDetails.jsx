import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBooking, createFavouriteApi, getAamaDetailsById } from '../apis/Api';
import Navbar from '../components/Navbar';

const AamaDetails = () => {
    const { id } = useParams();
    const [successMessage, setSuccessMessage] = useState(null);
    const [aamaName, setAamaName] = useState('');
    const [age, setAge] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [charge, setCharge] = useState('');
    const [experience, setExperience] = useState('');
    const [time, setTime] = useState('');
    const [language, setLanguage] = useState('');
    const [description, setDescription] = useState('');
    const [aamaImage, setAamaImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [aamaId, setAamaId] = useState(id);
    const [bookingData, setBookingData] = useState({
        dateTime: '',
        aamaId: id,
    });

    useEffect(() => {
        getAamaDetailsById(id).then((res) => {
            setAamaImage(res.data.aamaDetail.aamaImageUrl);
            setAamaName(res.data.aamaDetail.name);
            setAge(res.data.aamaDetail.age);
            setSpeciality(res.data.aamaDetail.speciality);
            setCharge(res.data.aamaDetail.charge);
            setAge(res.data.aamaDetail.age);
            setExperience(res.data.aamaDetail.experience);
            setTime(res.data.aamaDetail.time);
            setLanguage(res.data.aamaDetail.language);
            setDescription(res.data.aamaDetail.description);
            setAamaId(res.data.aamaDetail._id)
        });
    }, [id]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleDateTimeChange = (e) => {
        setBookingData({ ...bookingData, dateTime: e.target.value });
    };

    const handleBookNow = () => {
        console.log('Booking Data:', bookingData);
        createBooking(bookingData).then((res) => {
            if (res.data.success) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        }).catch((error) => {
            console.log(error)
        })
    };

    const createFavourite = () => {
        const formData = new FormData();
        formData.append('aamaId', aamaId)
        createFavouriteApi(formData).then((res) => {
            if (res.data.success) {
                setSuccessMessage('Added to favorites!');
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
            <h1 className='text-4xl font-medium text-red-600 md:px-32 mt-5 px-2'>आमा Details</h1>
            <main className='w-full flex flex-row flex-wrap py-10 justify-center items-start gap-10 text-black'>
                <div className="flex flex-col gap-y-2 md:w-[40%] w-full md:px-0 px-6">
                    <img className='h-[250px] w-[250px] mx-auto' src={aamaImage} alt="Aama" />
                    <div className="flex justify-between items-center md:px-10 px-0 mt-5">
                        <p className='text-2xl font-semibold'>{aamaName}</p>
                        <p className='text-2xl font-semibold'>{age}</p>
                    </div>
                    <div className="flex justify-between items-center md:px-10 px-0 mt-2">
                        <p className='text-md'>Speciality</p>
                        <p className='text-md'>{speciality}</p>
                    </div>
                    <div className="flex justify-between items-center md:px-10 px-0">
                        <p className='text-md'>Charge</p>
                        <p className='text-md'>{charge}</p>
                    </div>
                    <div className="flex justify-between items-center md:px-10 px-0">
                        <p className='text-md'>Experience</p>
                        <p className='text-md'>{experience}</p>
                    </div>
                    <div className="flex justify-between items-center md:px-10 px-0">
                        <p className='text-md'>Time</p>
                        <p className='text-md'>{time}</p>
                    </div>
                    <div className="flex justify-between items-center md:px-10 px-0">
                        <p className='text-md'>Language</p>
                        <p className='text-md'>{language}</p>
                    </div>
                    <button
                        onClick={createFavourite}
                        className='w-[90%] py-3 text-center px-10 mt-4 mx-auto text-sm bg-blue-700 text-white rounded-lg hover:text-md'
                        disabled={successMessage !== null}
                    >
                        {successMessage ? successMessage : 'Add to favorite'}{' '}
                        {successMessage && <i className="fas fa-check"></i>}
                    </button>
                    <Link onClick={toggleModal} className='w-[90%] py-3 text-center px-10 mt-2 mx-auto bg-blue-700 text-white rounded-lg hover:text-lg'>Book Now</Link>
                </div>
                <div className="flex flex-col justify-center items-center gap-y-4 md:w-[40%] w-full md:px-20 px-6 overflow-hidden">
                    <h1 className='text-2xl font-semibold'>About Aama</h1>
                    <p className='mt-4 px-1'>{description}</p>
                </div>

                {isModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
                        <div className="bg-white p-8 rounded-md md:w-[300px] w-full">
                            <h2 className="text-2xl font-semibold mb-4">Booking</h2>
                            <form className='flex flex-col'>
                                <label htmlFor="dateTime">Date and Time:</label>
                                <input
                                    type="datetime-local"
                                    id="dateTime"
                                    name="dateTime"
                                    value={bookingData.dateTime}
                                    onChange={handleDateTimeChange}
                                />

                                <input type="hidden" name="aamaId" value={bookingData.aamaId} />

                                <button type="button" onClick={handleBookNow} className="bg-blue-700 text-white px-4 py-2 rounded-lg mt-4">
                                    Book Now
                                </button>
                            </form>

                            <button onClick={toggleModal} className="bg-red-700 text-white px-4 py-2 rounded-lg mt-4 w-full">Close</button>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default AamaDetails;
