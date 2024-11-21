import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../components/Dropdown";
import {Link} from 'react-router-dom'
import { userLogoutAction } from "../redux/action/userAction";
import Checkout from "../pages/checkout";

const NavBar = () => {

  const userLoginReducer = useSelector((state)=>state.userLoginReducer)
  const {userInfo}= userLoginReducer

  const dispatch= useDispatch()

  const qty = useSelector((state) => state.cartReducer.cartItems.reduce((total, item) => total+item.qty, 0))
  const handleLogout =()=> {
    dispatch(userLogoutAction())
  }

  const [open, setOpen]= useState(false)


  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            CodeDvsn
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {!userInfo ? (
              <Link
              to="/register"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get started
            </Link>
            ) : (
              <>
              <Dropdown logoutHandle={handleLogout}/>
              <button
              data-collapse-toggle="navbar-cta"
              type="button"
              onClick={()=> setOpen(true)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

<span>{qty}</span>
<Checkout open={open} setOpen={setOpen}/>

            </button>
              </>
              
            )}
            
          
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-row font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
  <li>
    <Link
      to="/"
      className="block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 md:text-blue-700 md:dark:text-blue-500"
      aria-current="page"
    >
      Home
    </Link>
  </li>
  <li>
    <Link
      to="#"
      className="block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 md:text-blue-700 md:dark:text-blue-500"
    >
      About
    </Link>
  </li>
</ul>

          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
