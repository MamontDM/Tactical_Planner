import React, { useEffect, useState } from 'react';

const ShipListCard = ({ ship }) => {
    if (!ship) return <div className="empty-slot">Empty slot</div>;
    
    const {name, tier, nation, class: shipClass} = ship;


    useEffect(() => {
        
    },[ship]);

    return (
        <div className="shpi-list item">
            {name} {tier}
        </div>
    )
};


export default ShipListCard;