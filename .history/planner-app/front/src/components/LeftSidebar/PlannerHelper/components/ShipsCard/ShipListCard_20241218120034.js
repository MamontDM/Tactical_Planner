import React, { useEffect, useState } from 'react';

const ShipListCard =({ ship }) => {
    
    const { sihp } = ship;


    useEffect(() => {
        console.log(ship);

        if(shipData){
            console.log(shipData);
        }
    },[ship]);

    return null;
};


export default ShipListCard;