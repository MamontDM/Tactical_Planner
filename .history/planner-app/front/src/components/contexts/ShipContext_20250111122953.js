import {createContext, useState, useEffect} from 'react'

const ShipContext = createContext();

  const defaultConfig = {
        limitations: [],
        Battleships: 0,
        Cruisers: 0,
        Destroyers: 0,
        Submarines: 0,
        AirCarriers: 0,
    };

const ShipProvider = ({ children }) => {
    const [config, setConfig] = useState(defaultConfig);
    const [shipsNameList, setShipsNameList] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [selectedShip, setSelectedShip] = useState([]);


    const updateConfigField = (field, value) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            [field]: value,
        }));
    };

    const fetchAllShipsName = async () => {
        console.log('fetchAllShipsName called');
        try {
           const response = await fetch('api/name-allships');
           if(!response.ok){
             throw new Error("Failed to fetch all names!");
           }
             const data = await response.json();
             setShipsNameList(data);
             setIsDataLoaded(true);
           } catch (error) {
             console.error('Error fetching ships: ', error.message);
         }
      };

      
    useEffect(() => {
        if(!isDataLoaded){
            fetchAllShipsName();
        }
    }, [isDataLoaded]);

    const addShip = (ship) => { 
        console.log(ship);
        setSelectedShip((prev) => [...prev, ship]);
    };

    const removeShip = (ship) => {
        setSelectedShip((prev) => prev.filter((s) => s !== ship));
    };

    const clearSelectedShips = () => {
        setSelectedShip([]);
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
                shipsNameList,
                isDataLoaded,
                selectedShip,
                removeShip,
                clearSelectedShips, 
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