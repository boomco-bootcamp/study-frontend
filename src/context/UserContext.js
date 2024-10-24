import React, { createContext, useContext, useState, useEffect } from 'react';
import Axios from "../api/api";

const initialUserState = {
    name: null,
    userId: null,
    userIdx: null,
    loginStatus: false,
    type: "N"
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(initialUserState);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userInfo) => {
        const updatedUser = { ...userInfo, loginStatus: true };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const logout = () => {
        setUser(initialUserState);
        localStorage.removeItem('user');
        localStorage.removeItem("authToken");
    };


    const value = {
        user,
        login,
        logout,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
