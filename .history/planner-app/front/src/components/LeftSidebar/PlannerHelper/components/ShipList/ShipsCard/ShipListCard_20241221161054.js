import React, { useEffect, useState } from 'react';

const ShipListCard = ({ship}) => {
    const name = ship.name;
    console.log(ship);
    return ( 
        <div className="shpi-list-item">
            {name}
        </div>
    )
};


export default ShipListCard;