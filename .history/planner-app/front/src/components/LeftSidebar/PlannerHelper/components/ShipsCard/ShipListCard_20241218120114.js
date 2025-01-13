import React, { useEffect, useState } from 'react';

const ShipListCard =({ ship }) => {
    
    const {shipData} = ship;


    useEffect(() => {
        console.log(shipData);

        if(shipData){
            console.log(shipData);
        }
    },[ship]);

    return null;
};


export default ShipListCard;