import { useState } from 'react'; 

const PlannerHelper = () =>{
    const [config, setConfig] = useState({

    })
    const shipTypes =  [
        {

        }
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