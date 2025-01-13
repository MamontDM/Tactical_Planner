import React from 'react';
import { star, aircraft_carrier, battleship, cruiser, destroyer, submarine, } from '../../../../../assets/Icon/Config_Icons/exportConfig_icon';

const ConfigList = ({config}) => {
    const { limitations, ...shipCongif } = props;
    
    const shipIcons = {
        'Aircraft Carriers': aircraft_carrier,
        SuperShips: star,
        Battleships: battleship,
        Cruisers: cruiser,
        Destroyers: destroyer,
        Submarines: submarine,
    }

    return(
        <div className="config-list">
            {Object.entries(shipCongif).map(([key, value]) =>
                <div ley={key} className="config-item">
                    <img src={shipIcons[key]} alt={key} className="config-list-icon"/>
                    <p>
                        <strong>{key}:</strong> {value}
                    </p>
                </div> 
            )}
        </div>
    )
};
export default ConfigList;