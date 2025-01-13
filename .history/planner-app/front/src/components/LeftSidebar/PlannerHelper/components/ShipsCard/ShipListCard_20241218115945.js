import React, { useEffect, useState } from 'react';

const ShipListCard =({ship}) => {
    
    const { shipData } = ship;


    useEffect(() => {
        console.log('called')
        if(shipData){
            console.log(shipData);
        }
    },[ship]);

    return null;
};


export default ShipListCard;