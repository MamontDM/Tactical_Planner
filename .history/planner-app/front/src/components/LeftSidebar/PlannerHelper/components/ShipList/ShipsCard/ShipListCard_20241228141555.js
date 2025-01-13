import React from 'react';
import {EU, FRA, GER, UK, USA, USSR, SP, ITA, PA, PANASIA, JP } from '../../../../../../assets/exportShipCard';


const ShipListCard = ({ship}) => {
   const [shipData] = ship;
   const { id, name, tier, nation, class: className } = shipData;

    const nationIcons = {
        usa: USA,
        pan_america: PA, 
        japan: JP,
        europe: EU,
        pan_asia: PANASIA,
        ussr: USSR,
        france: FRA,
        uk: UK,
        italy: ITA,
    }

   
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