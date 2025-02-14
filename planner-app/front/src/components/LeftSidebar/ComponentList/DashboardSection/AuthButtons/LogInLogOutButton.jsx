import React, { useContext, useState } from 'react';
import AuthContext from '../../../../contexts/AuthContext';
import './LogInOut.css';
import UserCard from '../UserCard/UserCard';
import { downArrow, upArrow } from '../../../../../assets/exportUserCardIcon';

const LogInLogoutButton = () =>{
    const { isAuthenticated, login, logout} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(true);
    
    
    const toggleIsOpen = () =>{
        setIsOpen((prev)=> prev = !prev);
    };

    return (
        <>
            <div className="loginSection-toggler">
                <div className="loginSection-label">Dashboard section</div>
                <button className="loginSection-button"
                        onClick={toggleIsOpen}>
                    <img className="loginSection-img" src={isOpen ? upArrow : downArrow} alt="arrowImg"></img>
                </button>
            </div>
           {isOpen && <div className="loginSection">
                {!isAuthenticated ? (
                    <button className="header__button login"
                            onClick={login}> 
                            Login
                    </button>
                ) : (
                    <>
                        <UserCard />
                        <button className="header__button logout" 
                                onClick={logout}> 
                                LogOut
                        </button>
                    </>
            )}
            </div>}
        </>
    );
};

export default LogInLogoutButton;