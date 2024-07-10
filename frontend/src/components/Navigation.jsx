import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../redux/api/userApiSlice';
import { logout } from '../redux/features/auth/authSlice';
import { BiSolidLogInCircle } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";


const Navigation = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const totalFavourites=useSelector((state)=>state.favourite.totalFavourites)
    const totalCartItems=useSelector((state)=>state.cart.totalCartItems)
    console.log(totalFavourites);
    const [logoutApiCall] = useLogoutMutation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleDropdown = () => {
        console.log("dropdown clicked");
        setDropdownOpen(!dropdownOpen);
    };

    const toggleSidebar = () => {
        console.log("showsidebar clicked");
        setShowSidebar(!showSidebar);
    };

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            toggleSidebar()
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>

            
            <button
                onClick={toggleSidebar}
                data-drawer-target="sidebar-multi-level-sidebar"
                data-drawer-toggle="sidebar-multi-level-sidebar"
                aria-controls="sidebar-multi-level-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>
            

            
                <aside
                    id="sidebar-multi-level-sidebar"
                    className={`fixed top-0 left-0 z-40 w-48 h-full transition-transform transform ${
                        showSidebar ? 'translate-x-0 z-40 ' : '-translate-x-full '
                    }`}
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 py-4 overflow-y-auto bg-stone-900">


                    <button
                        onClick={toggleSidebar}
                        type="button"
                        className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-pink-700 dark:focus:ring-pink-600"
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9.293l4.707-4.707a1 1 0 011.414 1.414L11.414 10l4.707 4.707a1 1 0 01-1.414 1.414L10 11.414l-4.707 4.707a1 1 0 01-1.414-1.414L8.586 10 3.879 5.293a1 1 0 011.414-1.414L10 9.293z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>


                        <ul className="space-y-2 font-medium ">
                            <li>
                                <Link
                                    onClick={toggleSidebar}
                                    to={'/'}
                                    className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-pink-700 dark:hover:bg-gray-700 group"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="size-5"
                                    >
                                        <path d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" />
                                    </svg>
                                    <span className="ms-3">Home</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    onClick={toggleSidebar}
                                    to={'/shop'}
                                    className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-pink-700 dark:hover:bg-gray-700 group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"               fill="currentColor" className="size-5">
                                        <path  d="M6 5v1H4.667a1.75 1.75 0 0 0-1.743 1.598l-.826 9.5A1.75 1.75 0 0 0 3.84 19H16.16a1.75 1.75 0 0 0 1.743-1.902l-.826-9.5A1.75 1.75 0 0 0 15.333 6H14V5a4 4 0 0 0-8 0Zm4-2.5A2.5 2.5 0 0 0 7.5 5v1h5V5A2.5 2.5 0 0 0 10 2.5ZM7.5 10a2.5 2.5 0 0 0 5 0V8.75a.75.75 0 0 1 1.5 0V10a4 4 0 0 1-8 0V8.75a.75.75 0 0 1 1.5 0V10Z"  />
                                    </svg>

                                    <span className="ms-3">SHOP</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    onClick={toggleSidebar}
                                    to={'/cart'}
                                    className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-pink-700 dark:hover:bg-gray-700 group"
                                >
                                    <div className='relative'>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor" 
                                        className="size-5">
                                        <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.412.75.75 0 0 1 .58.875 48.645 48.645 0 0 1-1.618 6.2.75.75 0 0 1-.712.513H6a2.503 2.503 0 0 0-2.292 1.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807 4.002 4.002 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75ZM6 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                                    </svg>

                                    { userInfo && totalCartItems>0 &&
                                    <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-pink-400  rounded-full -top-1 -end-3">{totalCartItems}

                                    </div>}
                                    </div>

                                    <span className="ms-3">CART</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    onClick={toggleSidebar}
                                    to={'/favourite'}
                                    className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-pink-700 dark:hover:bg-gray-700 group"
                                >
                                    <div className='relative'>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor" 
                                        className="size-5">
                                        <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
                                    </svg>

                                    { userInfo && totalFavourites>0 &&
                                    <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-pink-400  rounded-full -top-1 -end-3">{totalFavourites}

                                    </div>}
                                    
                                    </div>
                                    
                                    <span className="ms-3">FAVOURITE</span>
                                    
                                </Link>
                            </li>

                            <div className='fixed bottom-10'>

                                {userInfo && (
                                    <li>
                                        <button
                                            type="button"
                                            onClick={toggleDropdown}
                                            className="flex items-center w-full p-2 text-base text-gray-50 transition duration-75 rounded-lg group hover:bg-pink-700 dark:text-white dark:hover:bg-pink-700"
                                            aria-controls="dropdown-example"
                                            data-collapse-toggle="dropdown-example"
                                        >
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                viewBox="0 0 20 20" 
                                                fill="currentColor" 
                                                className="size-5">
                                                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                                            </svg>

                                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                                {userInfo.username}
                                            </span>
                                            <svg
                                                className="w-3 h-3"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    d="m1 1 4 4 4-4"
                                                />
                                            </svg>
                                        </button>

                                        {dropdownOpen && (
                                            <ul className="mt-6 space-y-1">
                                                {userInfo.isAdmin && (
                                                    <>
                                                        <li>
                                                            <Link
                                                                onClick={toggleSidebar}
                                                                to={
                                                                    '/admin/dashboard'
                                                                }
                                                                className="flex items-center text-sm w-full p-2 text-gray-50 transition duration-75 rounded-lg pl-11 group hover:bg-pink-700 dark:hover:bg-pink-700"
                                                            >
                                                                Dashboard
                                                            </Link>
                                                        </li>

                                                        <li>
                                                            <Link
                                                                onClick={toggleSidebar}
                                                                to={
                                                                    '/admin/productlist'
                                                                }
                                                                className="flex items-center text-sm w-full p-2 text-gray-50 transition duration-75 rounded-lg pl-11 group hover:bg-pink-700  dark:hover:bg-pink-700"
                                                            >
                                                                Product
                                                            </Link>
                                                        </li>

                                                        <li>
                                                            <Link
                                                                onClick={toggleSidebar}
                                                                to={
                                                                    '/admin/orderlist'
                                                                }
                                                                className="flex items-center text-sm w-full p-2 text-gray-50 transition duration-75 rounded-lg pl-11 group hover:bg-pink-700  dark:hover:bg-pink-700"
                                                            >
                                                                Orders
                                                            </Link>
                                                        </li>

                                                        <li>
                                                            <Link
                                                                onClick={toggleSidebar}
                                                                to={
                                                                    '/admin/category'
                                                                }
                                                                className="flex items-center text-sm w-full p-2 text-gray-50 transition duration-75 rounded-lg pl-11 group hover:bg-pink-700  dark:hover:bg-pink-700"
                                                            >
                                                                Category
                                                            </Link>
                                                        </li>

                                                        <li>
                                                            <Link
                                                                onClick={toggleSidebar}
                                                                to={
                                                                    '/admin/userlist'
                                                                }
                                                                className="flex items-center text-sm w-full p-2 text-gray-50 transition duration-75 rounded-lg pl-11 group hover:bg-pink-700  dark:hover:bg-pink-700"
                                                            >
                                                                Users
                                                            </Link>
                                                        </li>
                                                    </>
                                                )}

                                                <li>
                                                    <Link
                                                        onClick={toggleSidebar}
                                                        to={'/profile'}
                                                        className="flex items-center text-sm w-full p-2 text-gray-50 transition duration-75 rounded-lg pl-11 group hover:bg-pink-700  dark:hover:bg-pink-700"
                                                    >
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={logoutHandler}
                                                        className="flex items-center text-sm w-full p-2 text-gray-50 transition duration-75 rounded-lg pl-11 group hover:bg-pink-700  dark:hover:bg-pink-700"
                                                    >
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                )}


                                {!userInfo && (
                                    <>
                                        <li>
                                    <Link
                                        onClick={toggleSidebar}
                                        to={'/login'}
                                        className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-pink-700 group"
                                    >
                                        <BiSolidLogInCircle size={20}/>
                                        <span className="flex-1 ms-3 whitespace-nowrap">
                                            Login
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={toggleSidebar}
                                        to={'/register'}
                                        className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-pink-700 group"
                                    >
                                        <FaUserEdit size={20}/>
                                        <span className="flex-1 ms-3 whitespace-nowrap">
                                            Register
                                        </span>
                                    </Link>
                                </li>
                                    </>
                                )}
                            
                            </div>

                            
                        </ul>
                    </div>
                </aside>
           
        </div>
    );
};

export default Navigation;
