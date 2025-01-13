import {createContext , useState} from 'react'
const ShipContext = createContext();
const ShipProvider = ({children, config}) => {
    const [selectedShip, setSelectedShip] = useState({});
}