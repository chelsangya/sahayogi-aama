import React from 'react'
import Navbar from '../components/Navbar'

const Homepage = () => {
  return (
    <>
    <Navbar/>
      <main className='flex flex-row w-full h-screen text-white font-[poppins] bg-white pr-8 pb-4 items-start'>
        <div className="flex flex-1 px-10 ml-8 mt-8 py-10 mx-auto bg-gradient-to-l from-sky-950 via-cyan-900 to-blue-300 rounded-3xl">
          <div className="flex flex-col space-y-4 w-2/5">
            <h1 className='text-black font-medium text-5xl'>Effortless Hiring, Effective Care</h1>
            <div className="flex items-center justify-center">
              <div className="flex flex-col border-r-2 border-solid border-black px-5 py-5 text-left text-xl text-black">
                <h2 className='text-2xl font-bold'>50+</h2>
                <p>Happy Homes</p>
              </div>
              <div className="flex flex-col px-10 py-5 text-left text-xl text-black">
                <h2 className='text-2xl font-bold'>1+</h2>
                <p>Care Takers</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Homepage