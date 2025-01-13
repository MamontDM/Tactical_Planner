import {createContext, useState, useEffect} from 'react'

const ShipContext = createContext();

const ShipProvider = ({children, initialConfig}) => {
    const [config, setConfig] = useState(initialConfig);
    const [ships, setShips] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [selectedShip, setSelectedShip] = useState([]);

    const fetchAllShipsName = async () => {
        try {
           const response = await fetch('api/name-allships');
           if(!response.ok){
             throw new Error("Failed to fetch all names!");
           }
             const data = await response.json();
             setShips(data);
             setIsDataLoaded(true);
           } catch (error) {
             console.error('Error fetching ships: ', error.message);
         }
      };
      useEffect(() => {
        fetchAllShipsName();
    }, []);

    const updateConfigField = (field, value) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            [field]: value,
        }));
    };

    const addShip = (ship) => { 
        setSelectedShip((prev) => [...prev, ship]);
    };

    const addLimitation = () => {
        setConfig((prevConfig) => {
            const currentLimitations = prevConfig.limitations || [];
            if (
                currentLimitations.length === 0 ||
                currentLimitations.every((lim) => lim.value.trim() !== "")
            ) {
                return {
                    ...prevConfig,
                    limitations: [...currentLimitations, { id: Date.now(), value: "" }],
                };
            } else {
                alert("Заполните все существующие ограничения перед добавлением нового.");
                return prevConfig;
            }
        });
    };

    const updateLimitation = (id, value) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            limitations: prevConfig.limitations.map((lim) =>
                lim.id === id ? { ...lim, value } : lim
            ),
        }));
    };

    const removeLimitation = (id) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            limitations: prevConfig.limitations.filter((lim) => lim.id !== id),
        }));
    };



    return (
        <ShipContext.Provider value={{
                config,
                ships,
                isDataLoaded,
                selectedShip,
                setConfig,
               addShip,
                updateConfigField,
                addLimitation,
                updateLimitation,
                removeLimitation,
            }}>
            {children}
        </ShipContext.Provider>
    );
};

export { ShipContext, ShipProvider };