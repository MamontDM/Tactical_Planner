import { useState } from 'react'; 
import { IconCruiser, IconAircraft_carrier, IconBattleship, IconDestroyer, IconSuper_ship, IconSubmarine } from '../../../assets/exportIcon';

const PlannerHelper = () =>{
    const [config, setConfig] = useState({});
    const [isComplete, setIsComplete] = useState(false);
    
    const shipTypes =  [
        {id: 1, label: 'SuperShips',  icon: IconSuper_ship, title: 'SB'},
        {id: 2, label: 'Destroyers' , icon: IconDestroyer, title: 'DD'},
        {id: 3, label: 'Cruisers',    icon: IconCruiser, title: 'BC' }, 
        {id: 4, label: 'Battleships', icon: IconBattleship, title: 'BB' },
        {id: 5, label: 'Submarines',  icon: IconSubmarine, title: 'SM'},
        {id: 6, label: 'Aircraft Carriers',    icon: IconAircraft_carrier, title: 'CV'},
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
                    <>
                    <h3>Configure limitation</h3>
                    {shipTypes.map((type) => (
                       <div key={type.id} className="config-shipType-box">
                            <img className="config-icon" src={type.icon} alt={type.label} />
                            <p>{type.title}</p>
                            <input
                                className="config-input"
                                type="number"
                                value={config[type.label]}
                                placeholder={'Qty . . .'}
                                onChange={(e) => handleInputChange(type.label, e.target.value)}
                            />
                       </div>
                    ))}
                     <button onClick={hadnleIsComplete}>Complete</button>
                     </>
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