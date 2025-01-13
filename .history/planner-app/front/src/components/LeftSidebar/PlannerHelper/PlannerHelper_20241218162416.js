import { useState } from 'react'; 
import {SuperShip, Battleship, Destroyer, Cruiser, Submarine, Aircraft_carrier } from '../../../assets/exportConfigIcon';

const PlannerHelper = () =>{
    const [config, setConfig] = useState({});
    const [isComplete, setIsComplete] = useState(false);
    
    const shipTypes =  [
        {id: 1, label: 'SuperShips',  icon: SuperShip },
        {id: 2, label: 'Destroyers' , icon:  Destroyer},
        {id: 3, label: 'Cruisers',    icon: Cruiser },
        {id: 4, label: 'Battleships', icon: Battleship },
        {id: 5, label: 'Submarines',  icon: Submarine},
        {id: 6, label: 'Aircraft Carriers',    icon: Aircraft_carrier},
    ];

    const handleInputChange = (field, value) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            [field]: value,
        }));
    };

    const hadnleIsComplete = () => { 
        setIsComplete(true);
    };

    return ( 
        <div className="planner-wrapper">
            <div className="planner-sidebar">
                {!isComplete ? (
                    <div>
                    <h3>Configure Ship Types</h3>
                    {shipTypes.map((type) => (
                       <div key={type.id} className="config-shipType-box">
                            <img className="config-icon" src={type.icon} alt={type.label} />
                            <label>{type.label}</label>
                            <input
                                type="number"
                                value={config[type.label]}
                                onChange={(e) => handleInputChange(type.label, e.target.value)}
                                placeholder="Specify quantity"
                            />
                       </div>
                    ))}
                     <button onClick={hadnleIsComplete}>Complete</button>
                     </div>
                ) : ( 
                    <div className="config-summary">
                        <h3>Configuration Summary</h3>
                        {Object.entries(config).map(([key, value]) => (
                            <div key={key}>
                                <p>
                                    <strong>{key}:</strong> {value}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
               
            </div>
        </div>
    )



};

export default PlannerHelper;