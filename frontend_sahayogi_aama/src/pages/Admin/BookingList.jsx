import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteBookingByIdApi, getAllBookingApi } from '../../apis/Api';
import AdminSideBar from '../../components/AdminSideBar';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        getAllBookingApi()
            .then((res) => {
                setBookings(res.data.bookingsAdmin);
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
            <AdminSideBar />
            <div class="pl-1 sm:ml-64 min-h-screen h-max">
                <div>
                    <div class="flex items-start justify-start h-screen rounded bg-gray-50 dark:bg-gray-800">
                        <div class="relative overflow-x-auto pt-5 pl-5">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Aama Image
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Age
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Time
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Charge
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Experience
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Speciality
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Language
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Description
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Booked From
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Booked To
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Booked By
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Booked By Number
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Booked Address
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(bookings) &&
                                        bookings.map((booking) => (
                                            <tr key={booking._id}>
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
                                                    {booking.startDate}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {booking.endDate}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {booking.by.fullName}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {booking.by.phoneNumber}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {booking.by.address}
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingList