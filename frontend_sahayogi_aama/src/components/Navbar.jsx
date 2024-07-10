import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.clear()
    navigate('/login')
}

  let links = [
    { name: "HOME", link: "/" },
    { name: "AAMA", link: "/availableAama" },
    { name: "MY BOOKINGS", link: "/myBookings" },
    { name: "PROFILE", link: "/profile" },
  ];
  let [open, setOpen] = useState(false);
  
  return (
    <>
      <nav className='shadow-md w-full sticky top-0 left-0 font-[Poppins] font-medium text-medium z-[1]'>
        <div className='md:flex items-center justify-around bg-white py-4 md:px-10 px-7'>
          <Link to="/" className='flex items-center '>
            <span>
              <img
                className="w-[80px] h-[60px]"
                src="../assets/images/logo.png"
                alt=""
              />
            </span>
          </Link>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>
          <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-19.5 ' : 'top-[-490px]'}`}>
            {
              links.map((link) => (
                <li key={link.name} className='md:ml-8 md:my-0 my-7'>
                  <NavLink 
                    to={link.link} 
                    activeClassName='text-blue-600'
                    className='text-black duration-500 text-lg'
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))
            }
            <li className='md:ml-8 md:my-0 my-7 md:hidden'>
              <Link to='/contact' className='text-black hover:text-blue-600 duration-500'>CONTACT</Link>
            </li>
          </ul>
          <Link to="/contact" className='p-3 hidden md:block bg-black font-medium rounded-[10px] text-white hover:font-bold text-lg'>
            CONTACT
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
