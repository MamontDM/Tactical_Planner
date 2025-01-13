import React, { useEffect, useState } from 'react';

const ShipListCard =({ ship }) => {
    
    const {shipData} = ship;
    
    console.log(shipData);

    useEffect(() => {
        

        if(shipData){
            console.log(shipData);
        }
    },[ship]);

    return null;
};


export default ShipListCard;