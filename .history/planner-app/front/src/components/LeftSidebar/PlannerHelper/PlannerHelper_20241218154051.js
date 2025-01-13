import { useState } from 'react'; 
import {Super, Battleships, Destroyer, Cruiser, Submarine } from '../../../assets/exportConfigIcon';

const PlannerHelper = () =>{
    const [config, setConfig] = useState({

    })
    const shipTypes =  [
        Super         {id: 1, label: SuperShip, icon: '' },
        Destroyer     {id: 2, },
        Cruiser       {id: 3, },
        Battleships   {id: 4, },
        Destroyer     {id: 5, },
        Submarine     {id: 6, }

            

    ]
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
                {isComplete}
            </div>
        </div>
    )



};

export default PlannerHelper;