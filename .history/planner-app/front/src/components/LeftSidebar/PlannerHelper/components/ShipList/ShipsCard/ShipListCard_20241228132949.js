import React from 'react';
import {EUR, FRA, GER, UK, USA, USSR, SP, ITA } from '../../../../../../assets/exportShipCard';


const ShipListCard = ({ship}) => {
        const { class: className, tier, name, nation, images } = ship;


    console.log(nation);


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