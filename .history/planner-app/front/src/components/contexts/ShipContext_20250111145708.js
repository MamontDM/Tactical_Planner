import {createContext, useState, useEffect, useReducer} from 'react'

const defaultConfig = {
    limitations: [],
    Battleships: 0,
    Cruisers: 0,
    Destroyers: 0,
    Submarines: 0,
    AirCarriers: 0,
};

const initialShipState = {};

const ShipContext = createContext();

const shipReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_SHIP' :{
            console.log('called dispatch action');
            const {key, ship} = action.payload;
            console.log(key ,ship)
            return {
                ...state,
                [key]: [...(state[key]) || [], ship]
            };
        }
        case 'REMOVE_SHIP': {
            const { key, id } = action.payload;
            console.log(state);
            return {
                ...state,
                [key]: (state[key] || []).filter((ship) => ship.id !== id), 
            };
        }
        case 'CLEAR_SHIPS' : {
            return Object.keys(state).reduce((acc, key) => {
                acc[key] = [];
                return acc;
            }, {});
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

    const addShip = (key, ship) => {
        console.log('called method');
        dispatch({ type: 'ADD_SHIP', payload: { key, ship } });
    };
    const removeShip = (key, id) => {
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