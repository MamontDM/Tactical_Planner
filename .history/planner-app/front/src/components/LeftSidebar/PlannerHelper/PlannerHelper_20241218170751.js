import { useState } from 'react'; 
import { IconCruiser, IconAircraft_carrier, IconBattleship, IconDestroyer, IconSuper_ship, IconSubmarine } from '../../../assets/exportIcon';

const PlannerHelper = () =>{
    const [config, setConfig] = useState({});
    const [isComplete, setIsComplete] = useState(false);
    
    const shipTypes =  [
        {id: 1, label: 'SuperShips',  icon: IconSuper_ship },
        {id: 2, label: 'Destroyers' , icon: IconDestroyer},
        {id: 3, label: 'Cruisers',    icon: IconCruiser },
        {id: 4, label: 'Battleships', icon: IconBattleship },
        {id: 5, label: 'Submarines',  icon: IconSubmarine},
        {id: 6, label: 'Aircraft Carriers',    icon: IconAircraft_carrier},
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
                            <input
                                className="config-input"
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