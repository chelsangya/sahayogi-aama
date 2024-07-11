import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../components/AdminSideBar'
import { getAllContactApi } from '../../apis/Api'

const ContactList = () => {

    const [contact, setContact] = useState()

    useEffect(() => {
        getAllContactApi().then((res) => {
            setContact(res.data.contact)
        })
    }, [])

    return (
        <>
            <AdminSideBar />
            <div className="pl-1 sm:ml-64 min-h-screen max-h-max">
                <div>
                    <div className="flex items-start justify-start h-screen rounded bg-gray-50 dark:bg-gray-800">
                        <div className="relative overflow-x-auto pt-5 pl-5 w-full">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Contact
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Message
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contact ? (
                                        contact.map((data) => (
                                            <tr key={data._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4">
                                                    {data.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {data.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {data.number}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {data.message}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No Data Found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactList
