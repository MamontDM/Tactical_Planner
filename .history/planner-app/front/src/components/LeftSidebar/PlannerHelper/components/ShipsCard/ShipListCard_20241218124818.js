import React, { useEffect, useState } from 'react';

const ShipListCard = ({ ship }) => {

    const {name, tier, nation, class: shipClass} = ship;


    useEffect(() => {
        
    },[ship]);

    return (
        <div className="shpi-list item">
            {if(!ship) return (  
                <div className="empty-slot">Empty slot</div>);
            }
            {name} {tier}
        </div>
    )
};


export default ShipListCard;