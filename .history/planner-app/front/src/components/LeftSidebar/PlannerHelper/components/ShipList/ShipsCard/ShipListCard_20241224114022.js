import React, { useEffect, useState } from 'react';
import { useShipContext } from '../../../../../../hooks/useShipContext'


const ShipListCard = () => {
    const { selectedShip } = useShipContext();
const {class: className, id, images, name, tier, nation} = selectedShip;
    return ( 
        <div>
            {selectedShip.map((id, nation, name, tier) => (
                <div key={id} className="ship-list-item">
                    {nation}{name} {tier} 
                </div>
            ))}
        </div>
    )
};


export default ShipListCard;