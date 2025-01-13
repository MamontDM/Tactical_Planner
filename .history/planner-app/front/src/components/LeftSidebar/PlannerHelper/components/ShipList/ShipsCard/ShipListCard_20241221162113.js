import React, { useEffect, useState } from 'react';

const ShipListCard = ({ship}) => {


    return ( 
        <div>
            {ship.map(({class: className, id, images, name, tier, nation, tier}) => (
                <div className="shpi-list-item"
            ))}
        </div>
    )
};


export default ShipListCard;