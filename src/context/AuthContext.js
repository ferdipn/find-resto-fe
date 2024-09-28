import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [tokenUser, setTokenUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setTokenUser({ token });
        }
    }, []);

    const login = (token, user) => {
        setTokenUser(token);
        localStorage.setItem('token', token);
        localStorage.setItem('user_name', user.name);
        localStorage.setItem('user_type', user.type);
    };

    const logout = () => {
        setTokenUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_type');
    };

    const value = {
        tokenUser,
        login,
        logout,
        isAuthenticated: !!tokenUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
