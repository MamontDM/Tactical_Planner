import React from 'react';
import { star,  aircraft_carrier, battleship, cruiser, destroyer, submarine } from '../../../../../../assets/Icon/Config_Icons/exportConfig_icon';


const ShipListCard = ({ship}) => {

    return ( 
        <div>
            {ship.map(({class: className, id, images, name, tier, nation}) => (
                <div key={id} className="ship-list-item">
                    {nation}{name} {tier} 
                </div>
            ))}
        </div>
    )
};


export default ShipListCard;