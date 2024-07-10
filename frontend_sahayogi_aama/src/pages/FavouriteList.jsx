import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteFavApi, getFavListApi } from '../apis/Api'
import Navbar from '../components/Navbar'

const FavouriteList = () => {
    const [fav, setFav] = useState('')
    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(() => {
        getFavListApi().then((res) => {
            setFav(res.data.fav)
            console.log(res.data.fav)
        }).catch((error) => {
            console.error('Error fetching bookings:', error);
        });
    }, [isUpdated])

    const handleDelete = (id) => {
        deleteFavApi(id).then((res) => {
            if (res.data.success) {
                setIsUpdated((v) => !v)
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const navigate = useNavigate()

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
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(fav) && fav.map((favItem) => (
                                    favItem && (
                                        <tr key={favItem.to?._id} className="bg-white border-b">
                                            <td className="px-6 py-4">
                                                {favItem.to ? (
                                                    <img src={favItem.to.aamaImageUrl || ''} className="w-8 h-8 rounded-full" alt="Aama" />
                                                ) : (
                                                    <></>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {favItem.to ? (favItem.to.name) : <></>}
                                            </td>
                                            <td className="flex gap-3 px-6 py-4">
                                                {favItem.to && favItem.to._id && (
                                                    <>
                                                        <Link to={`/aamaDetails/${favItem.to._id}`}><i className="fa-solid fa-eye text-red-500"></i></Link>
                                                        <button onClick={() => handleDelete(favItem._id)}><i className="fa-solid fa-trash text-red-500"></i></button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}

export default FavouriteList