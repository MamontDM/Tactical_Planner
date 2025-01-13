import React, { useEffect, useState } from 'react';

const ShipListCard =({ship}) => {
    
    const [shipData, setShipData] = useState();


    useEffect(() => {
        setShipData(ship);
        console.log(shipData);
    },[ship]);

    return null;
};


export default ShipListCard;