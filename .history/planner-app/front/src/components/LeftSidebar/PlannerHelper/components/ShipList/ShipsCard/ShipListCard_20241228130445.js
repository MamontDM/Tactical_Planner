import React from 'react';
import {EUR, FRA, GER, UK, USA, USSR, SP, ITA } from '../../../../../../assets/exportShipCard';


const ShipListCard = ({ship}) => {
    const processedShip = ship.map(({id, name, tier, nation, images, class: className}) => ({
        id,
        name,
        tier,
        nation,
        imageUrl: images ? images[0] : null,
        className,
    }));
console.log(processedShip);


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