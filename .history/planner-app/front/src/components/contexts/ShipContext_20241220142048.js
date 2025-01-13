import {createContext , useState} from 'react'


const ShipContext = createContext();
const ShipProvider = ({children, config}) => {
    const [selectedShip, setSelectedShip] = useState({});

    const addShip = (type, ship) => {
        setSelectedShip((prev) => {
            const currentCount = prev.[type]?.length || 0;

            if(currentCount < config[type])
        })
    }

};