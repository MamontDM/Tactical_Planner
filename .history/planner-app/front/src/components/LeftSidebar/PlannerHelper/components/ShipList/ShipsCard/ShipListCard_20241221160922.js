import React, { useEffect, useState } from 'react';

const ShipListCard = ({ship}) => {
    console.log(JSON.stringify(ship));
    const {name, tier, nation, class: shipClass } = ship;
    console.log(name);
    return ( 
        <div className="shpi-list-item">
            {name} {tier}
        </div>
    )
};


export default ShipListCard;