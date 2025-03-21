import React from 'react';
import './config.css';
import { star, aircraft_carrier, battleship, cruiser, destroyer, submarine, } from '../../../../../../assets/Icon/Config_Icons/exportConfig_icon';
import { useShipContext } from '../../../../../../hooks/useShipContext';

const ConfigList = () => {
    const { config } = useShipContext();
    const { limitations, ...shipCongif } = config;



    const shipIcons = {
        AirCarrier: aircraft_carrier,
        SuperShip: star,
        Battleship: battleship,
        Cruiser: cruiser,
        Destroyer: destroyer,
        Submarine: submarine,
    }

    return(
        <>
        <div className="config-list">
            {Object.entries(shipCongif).map(([key, value]) => (
                    <div key={key} className={`config-item ${key}`}>
                            <img 
                                src={shipIcons[key]} 
                                alt={key} 
                                className="config-list-icon"
                                />
                     <p> {value} </p>
                    </div>
            ))}
        </div>

        <div className="config-list-limitations">
            <h4>Special conditions</h4>
                {limitations && limitations.length > 0 ? (
                    limitations.map((limitation) => (
                        <div key={limitation.id} className="limitation-item">
                            <p>{limitation.value}</p>
                        </div>
                    ))
                ) : (
                    <p> No limitations... </p>
            )}
    </div>
   </>
    );
}
export default ConfigList;