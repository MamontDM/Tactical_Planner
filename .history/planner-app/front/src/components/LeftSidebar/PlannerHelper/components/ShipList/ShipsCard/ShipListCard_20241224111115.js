import React, { useEffect, useState } from 'react';
import { useShipContext } from '../../../../../../hooks/useShipContext'

const ShipListCard = ({ship}) => {
 
    return ( 
        <div>
            {ship.map(() => (
                <div key={id} className="ship-list-item">
                    {nation}{name} {tier} 
                </div>
            ))}
        </div>
    )
};


export default ShipListCard;