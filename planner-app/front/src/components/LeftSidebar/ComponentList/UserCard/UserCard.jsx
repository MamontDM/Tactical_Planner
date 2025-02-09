import React, {useContext, useState, useEffect} from 'react';
import './UserCard.css';
import AuthContext from '../../../contexts/AuthContext';
import { defaultAvatar, traun, } from '../../../../assets/exportUserCardIcon';


const UserCard = () => {
    const {isAuthenticated, user} = useContext(AuthContext);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 
    
useEffect(() => {
    if (!isAuthenticated || !user) { 
        setIsLoading(true);
    }else {
        setIsLoading(false);
        setIsFlipped(true);
    }
    return () => {
        setIsFlipped(false);
    };
}, [isAuthenticated, user]);



return (
         <div className={`user-card ${isFlipped ? 'flipped' : ''}`}>
           {isLoading ? (
                <div className="user-card-front">
                    <div className="spinner"></div>
                </div>) : (
            <div className="user-card-back">
                        <div className="user-name-tag">
                            [{user?.clanTag}] {user?.name}
                            <div className="user-role">{user?.role}</div>
                        </div>
                            <div className="user-card-content">
                                <img className="user-avatar" src={traun} alt={defaultAvatar}></img>
                                <div className="user-todoList">
                                    <button>Map Storage</button>
                                    <button>Join Session(in development)</button>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
    );
};

export default UserCard;
