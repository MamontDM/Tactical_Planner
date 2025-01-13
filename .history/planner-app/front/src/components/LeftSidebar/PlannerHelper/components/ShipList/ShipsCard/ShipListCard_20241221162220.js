import React, { useEffect, useState } from 'react';

const ShipListCard = ({ship}) => {


    return ( 
        <div>
            {ship.data.map(({class: className, id, images, name, tier, nation, tier}) => (
                <div key={id} className="shpi-list-item">
                    {name}
                </div>
            ))}
        </div>
    )
};


export default ShipListCard;