import React from 'react';
import AdminSideBar from '../../components/AdminSideBar';

const AdminDashboard = () => {

    return (
        <>
            <AdminSideBar />
            <div class="p-4 sm:ml-64">
                <div class="p-2">
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="flex justify-start rounded bg-gray-50 h-36 px-5 py-10 dark:bg-gray-800 gap-y-5">
                            <p class="text-2xl text-neutral-200">
                                <p>TOTAL AAMA</p>
                                <p>50</p>
                            </p>
                        </div>
                        <div class="flex justify-start rounded bg-gray-50 h-36 px-5 py-10 dark:bg-gray-800 gap-y-5">
                            <p class="text-2xl text-neutral-200">
                                <p>TOTAL AAMA</p>
                                <p>50</p>
                            </p>
                        </div>
                        <div class="flex justify-start rounded bg-gray-50 h-36 px-5 py-10 dark:bg-gray-800 gap-y-5">
                            <p class="text-2xl text-neutral-200">
                                <p>TOTAL AAMA</p>
                                <p>50</p>
                            </p>
                        </div>
                        <div class="flex justify-start rounded bg-gray-50 h-36 px-5 py-10 dark:bg-gray-800 gap-y-5">
                            <p class="text-2xl text-neutral-200">
                                <p>TOTAL AAMA</p>
                                <p>50</p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard