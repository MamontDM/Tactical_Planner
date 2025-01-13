import React, { useEffect, useState } from 'react';

const ShipListCard =({ship}) => {
    
    const {shipData} = ship;


    useEffect(() => {
        setShipData(ship);
    },[ship]);

    return null;
};


export default ShipListCard;