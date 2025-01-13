import React,  { useEffect, useState }  from 'react';
import { useShipContext } from '../../../../../../hooks/useShipContext'
import ShipList from '../ShipList/shipList';
import './shipListTemplate.css';

const ShipTemplate = () => {

        const { config, clearSelectedShips } = useShipContext();
        const types = Object.entries(config).filter(([key]) => key !== 'limitations');
        const [clearListFlag, setClearListFlag] = useState(false);
        const [isEditing, setIsEditing] = useState(false);
        
        const handleClearShipList = () =>{
            setClearListFlag(true);
        };

        useEffect(() => {
            if (clearListFlag){
                clearSelectedShips();
                setClearListFlag(false);
            }
        }, [clearListFlag]);
        
        
        
        return (
        <div className="ship-template">
            {types.map(([type, limit]) => (
                limit > 0 && (
                <div key={type} className="ship-type">
                    <span>{type}</span>
                    <div className="ship-placeholder">
                        {[...Array(limit)].map((_, index) => (
                            <div key={index} className="placeholder">
                                <ShipList 
                                    type={type}
                                    index={index}
                                    clearListFlag={clearListFlag}
                                    />
                            </div>
                        ))}
                    </div>
                </div>
                )
            ))}
            <button className="clear-list"
                    onClick={handleClearShipList}>
                Clear all ships 
            </button>
            <button
                    className="edit-button"
                    onClick={() => setIsEditing((prev) => !prev)}
                > 
                  
            </button>
        </div>
    );
};

export default ShipTemplate;