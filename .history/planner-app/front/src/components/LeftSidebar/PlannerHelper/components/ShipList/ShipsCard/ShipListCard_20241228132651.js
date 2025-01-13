import React from 'react';
import {EUR, FRA, GER, UK, USA, USSR, SP, ITA } from '../../../../../../assets/exportShipCard';


const ShipListCard = ({ship}) => {
    ShipData.map((ship) => {
        const { class: className, tier, name, nation, images } = ship;
       
        return {
            id: ship.id,
            className: className,
            tier: tier,
            name: name,
            nation: nation,
            images: images,
        };
    });




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