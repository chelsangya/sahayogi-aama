import React, { useEffect, useState } from 'react';
import { deleteBookingByIdApi, getAllBookingApi } from '../apis/Api';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        getAllBookingApi()
            .then((res) => {
                setBookings(res.data.bookings);
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error);
            });
    }, [isUpdated]);

    const handleDelete = (id) => {
        deleteBookingByIdApi(id)
            .then((res) => {
                if (res.data.success) {
                    setIsUpdated((v) => !v);
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Navbar />
            <main className="w-full flex flex-col justify-start items-start text-black md:p-10 p-2">
                <h1 className="text-2xl font-semibold">My Bookings</h1>
                <div className="relative overflow-x-auto pt-5 pl-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-900">
                        <thead className="text-xs text-gray-900 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Aama Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Age
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Charge
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Experience
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Speciality
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Language
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    Booked DateTime
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(bookings) &&
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="bg-white border-b">
                                        <td className="px-6 py-4">
                                            {booking.aama && booking.aama.aamaImageUrl && (
                                                <img
                                                    src={booking.aama.aamaImageUrl}
                                                    className="w-8 h-8 rounded-full"
                                                    alt="Aama"
                                                />
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {booking.aama ? booking.aama.name : 'No Aama'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {booking.aama ? booking.aama.age : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {booking.aama ? booking.aama.time : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {booking.aama ? booking.aama.charge : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {booking.aama ? booking.aama.experience : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {booking.aama ? booking.aama.speciality : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {booking.aama ? booking.aama.language : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 max-w-40 overflow-auto">
                                            {booking.aama ? booking.aama.description : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {booking.dateTime}
                                        </td>
                                        <td className="flex gap-2 px-6 py-4">
                                            <button onClick={() => handleDelete(booking._id)}>
                                                <i className="fa-solid fa-trash text-red-500"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
};

export default MyBookings;
