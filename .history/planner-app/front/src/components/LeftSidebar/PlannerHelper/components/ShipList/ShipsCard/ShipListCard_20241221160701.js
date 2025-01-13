import React, { useEffect, useState } from 'react';

const ShipListCard = ({ ship }) => {
console.log(ship);
    const {name, tier, nation, class: shipClass} = ship;

    return ( 
        <div className="shpi-list-item">
            {name} {tier}
        </div>
    )
};


export default ShipListCard;