import React from 'react';
import Logo from "../../../Assets/Logo.png";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900/90 via-purple-900/95 to-purple-900/100 rounded-md shadow m-4 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex xl:flex xl:items-center xl:justify-between sm:items-center sm:justify-between">
          <Link
            to="#/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="h-8" alt="Rudra Logo" />
            <span className="self-center text-2xl uppercase font-bold whitespace-nowrap text-white text-shadow text-shadow-blur-4 text-shadow-x-1 text-shadow-y-2 ">
              Rudra Gift Shop
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-semibold font-poppins text-white  sm:mb-0 ">
            <li>
              <Link to="#" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline me-4 md:me-6">
                Licensing
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-white font-medium font-ubuntu_sans sm:text-center ">
          © 2024
          <Link to="#" className="hover:underline">
            Rudra™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer