import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAamaDetailsApi } from '../apis/Api';
import Navbar from '../components/Navbar';

const AvailableAama = () => {
    const [aamas, setAamas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getAamaDetailsApi().then((res) => {
            setAamas(res.data.aama);
        });
    }, []);

    const handleSort = (field) => {
        const sortedAamas = [...aamas].sort((a, b) => {
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });

        setAamas(sortedAamas);
    };

    const handleSearchQueryChange = (e) => {
        const sanitizedQuery = DOMPurify.sanitize(e.target.value);
        setSearchQuery(sanitizedQuery);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    return (
        <>
            <Navbar />
            <main className='w-full flex flex-col py-10 justify-start items-start text-black'>
                <div className='w-[90%] border-2 rounded-md mx-auto flex items-center px-4 py-2 bg-white'>
                    <input
                        type="text"
                        placeholder='Search here...'
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        className='w-full px-4 text-black outline-none py-2'
                    />
                    {searchQuery && (
                        <button onClick={handleClearSearch} className='text-gray-500 ml-2'>
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                    <button className='text-gray-500 ml-2'>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="w-[90%] mt-10 mx-auto">
                    <div className="flex justify-between flex-wrap items-center w-full gap-y-4">
                        <h1 className='text-4xl font-medium text-red-600'>Available आमा</h1>
                        <button
                            onClick={() => handleSort('charge')}
                            className='text-white text-lg px-3 py-2 bg-black rounded-md'
                        >
                            Sort by Price
                        </button>
                    </div>
                    <div className="w-full flex flex-wrap justify-start gap-10 mt-10">
                        {aamas
                            .filter(
                                (aama) =>
                                    aama.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((data) => (
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
            </main>
        </>
    );
}

export default AvailableAama;
