import {createContext, useState} from 'react'

const ShipContext = createContext();

const ShipProvider = ({children, initialConfig}) => {
    const [selectedShip, setSelectedShip] = useState({});
    const [config, setConfig] = useState(initialConfig);

    const updateConfigField = (field, value) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            [field]: value,
        }));
    };

    const addShip = (type, ship) => {
        setSelectedShip((prev) => {
            const currentCount = prev[type]?.length || 0;

            if(currentCount < config[type]) {
                return {
                    ...prev,
                    [type]: [...(prev[type] || []), ship],
                };
            }else{
                alert(`Лимит для ${type} достигнут.`);
                return prev;
            }
        });
    };

    return (
        <ShipContext.Provider value ={{ config ,selectedShip, addShip}}>
            {children}
        </ShipContext.Provider>
    );
};

export { ShipContext, ShipProvider };