import React, { useEffect, useState } from 'react';

const ShipListCard = ({ ship }) => {
    
    const {name, tier, nation, class: shipClass, images} = ship;


    useEffect(() => {
        console.log(name, tier, nation, shipClass, images);
    },[ship]);

    return null;
};


export default ShipListCard;