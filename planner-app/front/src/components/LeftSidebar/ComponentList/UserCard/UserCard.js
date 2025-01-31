import React, {useContext} from 'react';
import './UserCard.css';
import AuthContext from '../../../contexts/AuthContext';
import { defaultAvatar, traun } from '../../../../assets/exportUserCardIcon';


const UserCard = () => {
    const {isAuthenticated, user, login, logout} = useContext(AuthContext);
    
console.log(user)
return   (
        <div className="user-card-wrapper">
            {!isAuthenticated || !user ? ( 
                
                <button 
                    className="button login"
                    onClick={login}> 
                        Login
                </button>
                ) : (
                    <>
                        <button className="button logout" onClick={logout}> 
                            LogOut
                        </button>
                        <h2>[{user.clanTag}] {user.name}</h2>
                            <div className="user-card-content">
                                <img className="user-avatar" src={traun} alt={defaultAvatar}></img>
                                <div className="user-todoList">
                                    <button>Map Storage</button>
                                    <button>Join Session(in development)</button>
                                </div>
                            </div>
                      
                        <h3> role: {user.role}</h3>
                    </>
            )}
        </div>
    );
};


export default UserCard;
