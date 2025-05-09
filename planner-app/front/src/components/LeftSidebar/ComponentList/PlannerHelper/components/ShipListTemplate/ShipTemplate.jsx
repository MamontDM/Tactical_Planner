import React,  { useEffect, useState }  from 'react';
import { useShipContext } from '../../../../../../hooks/useShipContext'
import ShipList from '../ShipList/shipList';
import './shipListTemplate.css';
import { cross, minus } from '../../../../../../assets/Icon/Config_Icons/exportConfig_icon';

const ShipTemplate = () => {
        const { config, clearSelectedShips, updateConfigField } = useShipContext();
        const types = Object.entries(config).filter(([key]) => key !== 'limitations');
        const [clearListFlag, setClearListFlag] = useState(false);
        const [isEditing, setIsEditing] = useState(false);
        const zeroLimitation = types.every(([type, limit]) => limit === 0); 
        
    const handleClearList = () => {
        setClearListFlag(true);
    }

    useEffect(() => {
        if (clearListFlag){
            clearSelectedShips();
            setClearListFlag(false);
        }
    }, [clearListFlag]);

        return (
    <>
        <div className="ship-template">
        {!isEditing && zeroLimitation  ? (
        <div className="no-ships-message">
          <p>No ships added...  <br/> to changed it click <br/> <strong>"Edit"</strong></p>
        </div>
      ) : (
            types.map(([type, limit]) => (
                (isEditing || limit > 0) && (<div key={type} className="ship-type">
                    <span>{type}</span>
                    <div className="ship-placeholder">
                        {[...Array(limit)].map((_, index) => (
                            <div key={index} className="placeholder">
                                <ShipList 
                                    uniqueKey={`${type}-${index}`}
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
                            <div className="button-group">
                                <button className="addItem-button"
                                        onClick={(e) => updateConfigField(type, limit + 1)}>
                                    <img className="cross-icon" src={cross} alt="cross"/>
                                </button>
                                    {limit > 0 && (
                                    <button className="deleteItem-button"
                                            onClick={(e) => updateConfigField(type, limit - 1)}
                                            >
                                        <img className="delete-icon" src={minus} alt="delete"/>
                                    </button>
                                    )}
                                </div>
                         )}
                </div>
                )
            ))
       )}
           
           {isEditing && (
                    <button className="clear-list"
                            onClick={handleClearList}
                            >
                        Clear all ships
                    </button>
            )}
        </div> 
        <button  className="edit-button"
                 onClick={() => setIsEditing((prev) => !prev)}> 
                {isEditing ? "Save" : "Edit"}
        </button>
    </>
    );
};

export default ShipTemplate;