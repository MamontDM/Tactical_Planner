import { useState } from 'react'; 
import {SuperShip, Battleships, Destroyer, Cruiser, Submarine, Aircraft_carrier } from '../../../assets/exportConfigIcon';

const PlannerHelper = () =>{
    const [config, setConfig] = useState({});
    const [isComplete, setIsComplete] = useState(false);
    
    const shipTypes =  [
        {id: 1, label: 'SuperShip',  icon: SuperShip },
        {id: 2, label: 'Destroyer' , icon:  Destroyer},
        {id: 3, label: 'Cruiser',    icon: Cruiser },
        {id: 4, label: 'Battleship', icon: Battleships },
        {id: 5, label: 'Submarine',  icon: Submarine},
        {id: 6, label: 'Aircraft Carrier',    icon: Aircraft_carrier},
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
                {isComplete ? (
                    <div>
                    <h3>Configure Ship Types</h3>
                    {shipTypes.map((type) => (
                       <div key={type.id} className="config-shipType-box">
                            <img src={type.icon} alt={type.label} />
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