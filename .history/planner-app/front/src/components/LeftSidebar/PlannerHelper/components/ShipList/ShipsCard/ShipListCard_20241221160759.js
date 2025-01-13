import React, { useEffect, useState } from 'react';

const ShipListCard = ({ ship }) => {

    const {name, tier, nation, class: shipClass } = ship;
    console.log(ship.name);
    return ( 
        <div className="shpi-list-item">
            {name} {tier}
        </div>
    )
};


export default ShipListCard;