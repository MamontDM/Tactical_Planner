import {createContext, useState, useEffect, useReducer} from 'react'

const defaultConfig = {
    limitations: [],
    Battleship: 0,
    Cruiser: 0,
    Destroyer: 0,
    Submarine: 0,
    AirCarrier: 0,
};

const initialShipState = {};

const ShipContext = createContext();

const shipReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_SHIP' :{
            const {key, ship} = action.payload;
            return {
                ...state,
                [key]: [ship]
            };
        }
        case 'REMOVE_SHIP': {
            const {key} = action.payload;
            const { [key]: _, ...newState } = state;
            return newState; 
        }
        case 'CLEAR_SHIPS' : {
            return {};
        }
        default:
            return state;
    }
};

const ShipProvider = ({ children }) => {
    const [config, setConfig] = useState(defaultConfig);
    const [shipsNameList, setShipsNameList] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [ships, dispatch] = useReducer(shipReducer, initialShipState);


    const updateConfigField = (field, value) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            [field]: value,
        }));
    };

    const fetchAllShipsName = async () => {
        try {
           const response = await fetch('api/name-allships');
           if(!response.ok){
             throw new Error("Failed to fetch all names!");
           }
             const data = await response.json();
             setShipsNameList(data);
            const filteredData = filteredByType(data)

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

    const addShip = (key, ship) => {
        console.log('called method');
        dispatch({ type: 'ADD_SHIP', payload: { key, ship } });
    };
    const removeShip = (key, id) => {
        console.log(key, id);
        dispatch({ type: 'REMOVE_SHIP', payload: { key, id } });
    };
    const clearSelectedShips = () => {
        dispatch({ type: 'CLEAR_SHIPS' });
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
                ships,
                addShip,
                removeShip,
                clearSelectedShips,
                setConfig,
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