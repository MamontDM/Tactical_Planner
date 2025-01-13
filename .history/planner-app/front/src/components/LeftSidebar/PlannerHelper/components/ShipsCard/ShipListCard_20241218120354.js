import React, { useEffect, useState } from 'react';

const ShipListCard = ({ ship }) => {
    
    const {name, tier, nation, class, images} = ship;

    console.log(shipData);

    useEffect(() => {
        

        if(shipData){
            console.log(shipData);
        }
    },[ship]);

    return null;
};


export default ShipListCard;