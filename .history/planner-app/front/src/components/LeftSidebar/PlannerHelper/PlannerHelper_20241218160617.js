import { useState } from 'react'; 
import {SuperShip, Battleships, Destroyer, Cruiser, Submarine, Aircraft_carrier } from '../../../assets/exportConfigIcon';

const PlannerHelper = () =>{
    const [config, setConfig] = useState({

    })
    const shipTypes =  [
        {id: 1, label: 'SuperShip',  icon: SuperShip },
        {id: 2, label: 'Destroyer' , icon:  Destroyer},
        {id: 3, label: 'Cruiser',    icon: Cruiser },
        {id: 4, label: 'Battleship', icon: Battleships },
        {id: 5, label: 'Submarine',  icon: Submarine},
        {id: 6, label: 'Aircraft Carrier',    icon: Aircraft_carrier},
    ];

    const [isComplete, setIsComplete] = useState(false);

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
                    shipTypes.map((types, index) => (
                       <div key={index} className="config-shipType-box">
                            <img src={type.icon} alt={type.label} />
                            <input
                                type="number"
                                onCnange={(e) => handleInputChange(type.id, e.target.value)}
                                placeholder="Specify quantity"
                            />
                       </div>
                    ))
                ) : ( 
                    ''
                )}
            </div>
        </div>
    )



};

export default PlannerHelper;