import React from 'react';
import { IconCruiser, IconAircraft_carrier, IconBattleship, IconDestroyer, IconSuper_ship, IconSubmarine } from '../../../../../assets/exportIcon';

const ConfigList = ({props}) => {
    const { limitations, ...shipCongif } = props;
    
    const shipIcons = {
        'Aircraft Carriers': IconAircraft_carrier,
        SuperShips: IconSuper_ship,
        Battleships: IconBattleship,
        Cruisers: IconCruiser,
        Destroyers: IconDestroyer,
        Submarines: IconSubmarine,
    }
};
    return (
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
    
export default ConfigList;