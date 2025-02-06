import React, { createContext, useState,  useEffect } from 'react';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [userId, setUserId] = useState(null);
const [user, setUser] = useState(null);


    useEffect(() => {
        fetch( `${API_BASE_URL}/auth/status`, {
            method: 'GET',
            credentials: 'include', 
        })
            .then((res) => {
                if(!res.ok){
                    throw new Error(`Http error, status:  ${res.status}`)
                }
                return res.json();
        })
            .then((data) => {
                if(data.isAuthenticated) {
                    setIsAuthenticated(true);
                    setUserId(data.user.account_id);
                    console.log(data);
                }else{
                    setIsAuthenticated(false);
                }
        })
        .catch((error) => {
            console.error('Auth Error:', error.message);
            setIsAuthenticated(false);
            setUser(null);
        });
    }, []);

    useEffect(() => {
        if(!isAuthenticated || !userId){
            console.log('isAuthenticated === false');
            console.log(userId);
            return;
        }
            fetch(`${API_BASE_URL}/api/user/profile?id=${userId}`)
                .then((res) => {
                    if(!res.ok){
                        throw new Error(`Http error, status:  ${res.status}`)
                    }
                    return res.json();
                })
                .then((data) =>{
                    if(data) {
                        console.log(data);
                        setUser(data);
                    }
                })
                .catch((error) => {
                    console.error('Errors in catch block:', error.message)
                })
    },[isAuthenticated, userId])

    const login = () => {
        window.location.href = `${API_BASE_URL}/auth/login`;
    };

    const logout = () => {
        fetch(`${API_BASE_URL}/auth/logout`, { 
            method: 'POST',
            credentials: 'include', 
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            })
            .catch((err) => console.error('Ошибка логаута:', err));
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
