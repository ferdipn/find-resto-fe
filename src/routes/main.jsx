import React from "react";
import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

import Login from '../pages/auth/login';
import Home from "../pages/home";
import Restaurant from "../pages/restaurants";


const RequireAuth = ({ children }) => {
    const { isAuthenticated } = useAuth();
    
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    
    return children;
};



const AppRoute = () => {

    const { isAuthenticated } = useAuth();
      
    return (
        <Routes>
            <Route path="/" element={
                !isAuthenticated ?
                <Home /> : <Restaurant />
            } />
            <Route 
                path="/login" 
                element={
                <RequireAuth>
                    <Login />
                </RequireAuth>
                } 
            />
        </Routes>
    )
}

export default AppRoute