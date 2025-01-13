import React,  { useEffect, useState }  from 'react';
import { useShipContext } from '../../../../../../hooks/useShipContext'
import ShipList from '../ShipList/shipList';
import './shipListTemplate.css';
import { cross } from '../../../../../../assets/Icon/Config_Icons/exportConfig_icon';

const ShipTemplate = () => {

        const { config, clearSelectedShips, updateConfigField } = useShipContext();
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
                (
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
                    {!isEditing ? (
                        null
                        ) : (
                            <>
                                <button className="add-list"
                                        onClick={(e) => updateConfigField(type, limit + 1)}>
                                    <img className="cross-icon" src={cross} alt="cross"/>
                                </button>
                                    {limit.length <= 0 ? (
                                        null
                                    ) : (
                                    <button className="deleteFrom-list"
                                            onClick={(e) => updateConfigField(type, limit + 1)}
                                            >
                                                <img className="cross-icon" src={cross} alt="cross"/>
                                    </button>
                                    )
                                }
                            </>
                        )
                    }
                </div>
                )
            ))}
          
          
          
          
          
            <button
                    className="edit-button"
                    onClick={() => setIsEditing((prev) => !prev)}
                > 
                    {isEditing ? "Save" : "Edit"}
            </button>
           {!isEditing ? (
            null
            ) : (
                <>
                    <button className="clear-list"
                            onClick={handleClearShipList}
                    >
                        Clear all ships
                    </button>
                </>
            )
           }
        </div>
    );
};

export default ShipTemplate;