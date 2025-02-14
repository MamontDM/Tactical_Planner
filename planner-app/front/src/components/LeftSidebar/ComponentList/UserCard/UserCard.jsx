import React, {useContext, useState, useEffect} from 'react';
import './UserCard.css';
import AuthContext from '../../../contexts/AuthContext';
import { commander, com_officer, recruiter, executive_officer } from '../../../../assets/exportUserCardIcon';


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

const avatarByRole = {
    'commander'             : commander,
    'executive_officer'     : executive_officer,
    'recruiter'             : recruiter,
    'commissioned_officer'  : com_officer,
}


return (
         <div className={'user-card-wrapper'}>
           {isLoading ? (
                <div className="user-card-spinnerBox">
                    <div className="spinner"></div>
                </div>) : (
            <div className="user-card-content">
                <div className="user-name-tag">
                    [{user?.clanTag}] {user?.name} 
                    </div>
                        <div className="user-card-block">
                            <img className="user-avatar" src={avatarByRole[user?.role]} alt={'Error Avatar'}></img>
                        <div className="user-card-nav">
                            <button>Map Storage</button>
                            <button>Join Session</button>
                    </div>
                </div>
                <span>{user?.role}</span>
            </div>
                       
                    )}
            </div>
    );
};

export default UserCard;
