import React, { useEffect, useState } from 'react';


const ShipListCard = () => {
    const { selectedShip } = useShipContext();
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