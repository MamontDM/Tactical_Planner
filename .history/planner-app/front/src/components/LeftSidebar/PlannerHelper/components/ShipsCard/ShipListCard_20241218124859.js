import React, { useEffect, useState } from 'react';

const ShipListCard = ({ ship }) => {

    const {name, tier, nation, class: shipClass} = ship;


    useEffect(() => {
        
    },[ship]);

    return ( {ship === null && (
        <div className="empty-slot">Empty slot</div>  
    )}
        <div className="shpi-list item">
            {name} {tier}
        </div>
    )
};


export default ShipListCard;