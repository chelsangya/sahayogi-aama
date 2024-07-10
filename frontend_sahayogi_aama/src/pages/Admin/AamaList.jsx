import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteAamaById, getAamaDetailsApi, getAamaDetailsById } from '../../apis/Api';
import AdminSideBar from '../../components/AdminSideBar';
import { Link, useParams } from 'react-router-dom';

const AamaList = () => {
    const [aamas, setAamas] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(() => {
        getAamaDetailsApi().then((res) => {
            setAamas(res.data.aama);
        });
    }, [isUpdated]);

    const handleDelete = (id) => {
        deleteAamaById(id).then((res) => {
            if (res.data.success) {
                setIsUpdated((v) => !v)
                toast.success(res.data.message)
            }
            else {
                toast.error(res.data.message)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

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
                                        <th scope="col" class="px-2 py-3">
                                            Verfied
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {aamas.map((aama) => (
                                        <tr key={aama._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4">
                                                <img src={aama.aamaImageUrl} alt={`Aama ${aama.name}`} className="w-8 h-8 rounded-full" />
                                            </td>
                                            <td className="px-6 py-4">
                                                {aama.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {aama.age}
                                            </td>
                                            <td className="px-6 py-4">
                                                {aama.time}
                                            </td>
                                            <td className="px-6 py-4">
                                                {aama.charge}
                                            </td>
                                            <td className="px-6 py-4">
                                                {aama.experience}
                                            </td>
                                            <td className="px-6 py-4">
                                                {aama.speciality}
                                            </td>
                                            <td className="px-6 py-4">
                                                {aama.language}
                                            </td>
                                            <td className="px-6 py-4 max-w-40 overflow-auto">
                                                {aama.description}
                                            </td>
                                            <td className="px-6 py-4">
                                                {aama.isVerified === "true" ? "Yes" : "No"}
                                            </td>
                                            <td className="flex gap-2 px-6 py-4">
                                                <Link to={`/editAama/${aama._id}`}><i class="fa-regular fa-pen-to-square text-blue-500"></i></Link>
                                                <button onClick={() => handleDelete(aama._id)}><i class="fa-solid fa-trash text-red-500"></i></button>
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

export default AamaList




