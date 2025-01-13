import { useState } from 'react'; 

const PlannerHelper = () =>{
    const [config, setConfig] = useState({

    })
    const [isComplete, setIsComplete] = useState(false);

    const handleInputChange = (field, value) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            [field]: valueб
        }));
    };




};

export default PlannerHelper;