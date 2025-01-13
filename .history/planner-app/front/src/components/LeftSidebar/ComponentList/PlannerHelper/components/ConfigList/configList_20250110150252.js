import React, {useState} from 'react';
import './config.css';
import { star, aircraft_carrier, battleship, cruiser, destroyer, submarine, } from '../../../../../../assets/Icon/Config_Icons/exportConfig_icon';
import { useShipContext } from '../../../../../../hooks/useShipContext';

const ConfigList = () => {
    const { config, updateConfigField, updateLimitation } = useShipContext();
    const { limitations, ...shipCongif } = config;
    const [isEditing, setIsEditing] = useState(false);

    const shipIcons = {
        AirCarriers: aircraft_carrier,
        SuperShips: star,
        Battleships: battleship,
        Cruisers: cruiser,
        Destroyers: destroyer,
        Submarines: submarine,
    }

    return(
        <>
   </>
    );
}
export default ConfigList;