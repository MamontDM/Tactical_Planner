import React, { useEffect, useState } from 'react';

const ShipListCard = ({ship}) => {

    return ( 
        <div>
            {ship.map(({class: className, id, images, name, tier, nation}) => (
                <div key={id} className="shpi-list-item">
                    {iamges}{name} {tier} 
                </div>
            ))}
        </div>
    )
};


export default ShipListCard;