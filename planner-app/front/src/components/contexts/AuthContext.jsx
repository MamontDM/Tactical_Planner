import React, { createContext, useState,  useEffect } from 'react';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : import.meta..env.VITE_API_BASE_URL;

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

const [isAuthenticated, setIsAuthenticated] = useState(false);
const [userId, setUserId] = useState(null);
const [user, setUser] = useState(null);

const redirectToStartPage = () => {
    const cleanUrl = window.location.origin + window.location.pathname;
    window.location.replace(cleanUrl);
}

useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get("account_id");
    
    if(!idFromUrl) return;
    
    setUserId(idFromUrl);

    fetch( `${API_BASE_URL}/auth/status?account_id=${idFromUrl}`, {
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
            setIsAuthenticated(data.isAuthenticated || false);
        })
        .catch((error) => {
            console.error('Auth Error:', error.message);
            setIsAuthenticated(false);
            setUser(null);
        });
}, []);

    useEffect(() => {
        if(!isAuthenticated || !userId)return;
            fetch(`${API_BASE_URL}/api/user/profile?id=${userId}`)
                .then((res) => {
                    if(!res.ok){
                        throw new Error(`Http error, status:  ${res.status}`)
                    }
                    return res.json();
                })
                .then((data) =>{
                    if(data) {
                        setUser(data);
                    }
                })
                .catch((error) => {
                    console.error('Errors in catch block:', error.message)
                })
    },[isAuthenticated, userId])


    const login = async () => {
        window.location.href = `${API_BASE_URL}/auth/login`;
    };

    const logout = async () => {
       try {
        
            const response = await fetch(`${API_BASE_URL}/auth/logOut?id=${userId}`, {
                method: 'POST', 
                credentials: 'include',
            });
            if (response.ok) {
                setIsAuthenticated(false);
                setUserId(null);
                redirectToStartPage();
                console.log('Logout successful, cookies removed');
            } else {
                console.error('Failed to logout');
            }
       } catch (error) {
            console.error('Error network:', error);
       }
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
