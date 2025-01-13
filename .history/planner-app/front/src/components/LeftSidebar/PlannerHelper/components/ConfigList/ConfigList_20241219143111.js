import React from 'react';
import { star, aircraft_carrier, battleship, cruiser, destroyer, submarine, } from '../../../../../assets/Icon/Config_Icons/exportConfig_icon';

const ConfigList = ({config}) => {
    const { limitations, ...shipCongif } = config;
    console.log(shipCongif);
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
            {Object.entries(shipCongif).map(([key, value]) =>(
                <div ley={key} className={`config-item grid-${key}`}>
                        <img src={shipIcons[key]} alt={key} className="config-list-icon"/>
                        <p><strong> : {value}</strong></p>
                </div> 
           ))}
           <div className="config-list-limitations">
                <h4>Special conditions</h4>
            {limitations && limitations.length > 0 ? (
                limitations.map((limitation) => (
                    <div key={limitation.id} className="limitation-item">
                        <p>{limitation.value}</p>
                    </div>
                ))
            ):(
                <p> No limitations... </p>
            )}
           </div>
        </div>
    );
}
export default ConfigList;