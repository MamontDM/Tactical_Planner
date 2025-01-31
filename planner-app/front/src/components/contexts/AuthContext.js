import React, { createContext, useState,  useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [user, setUser] = useState(null);


    useEffect(() => {
        fetch('auth/status')
            .then((res) => {
                if(!res.ok){
                    throw new Error(`Http error, status:  ${res.status}`)
                }
                return res.json();
    })
            .then((data) => {
                if(data.isAuthenticated) {
                    setIsAuthenticated(true);
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
        console.log(isAuthenticated);
        if(!isAuthenticated){
            console.log('isAuthenticated === false');
            return;
        }
        fetch('profile/playerData')
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
    },[isAuthenticated])

    const login = () => {
        window.location.href = 'http://localhost:5000/auth/login';
    };

    const logout = () => {
        fetch('/auth/logout', { method: 'POST' })
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
