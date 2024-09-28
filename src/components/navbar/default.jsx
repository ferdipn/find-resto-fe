import React from "react";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const { isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();


    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="javascript:void(0)" className="flex items-center space-x-3 rtl:space-x-reverse">
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50">
                        {isAuthenticated 
                        ?
                        <li>
                            <button 
                                onClick={handleLogout} 
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700">Logout</button>
                        </li>
                        :
                        <li>
                            <button 
                                onClick={() => navigate('/login')} 
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700">Login</button>
                        </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;