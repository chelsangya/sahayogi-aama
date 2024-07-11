import React, { useEffect, useState } from 'react';
import { getAamaDetailsApi, updateAamaVerification } from '../../apis/Api';
import AdminSideBar from '../../components/AdminSideBar';
import { toast } from 'react-toastify';

const VerificationList = () => {
    const [aamas, setAamas] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        getAamaDetailsApi().then((res) => {
            setAamas(res.data.aama);
        });
    }, [isUpdated]);

    const handleVerification = async (id) => {
        const formData = new FormData()
        formData.append('isVerified', "true")
        formData.append('id', id)
        updateAamaVerification(formData, id).then((res)=> {
            if(res.data.success) {
                setIsUpdated((v) => !v);
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        })
      };

    return (
        <>
            <AdminSideBar />
            <div class="pl-1 sm:ml-64 min-h-screen max-h-max">
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
                                    {aamas.filter((aama) => aama.isVerified === "false").map((aama) => (
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
                                                <button onClick={() => handleVerification(aama._id)}><i class="fa-solid fa-square-check text-green-500 text-lg"></i></button>
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

export default VerificationList