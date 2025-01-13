import React, { useEffect, useState } from 'react';

const ShipListCard = ({ship}) => {
    const [ className : class, id, images, name, nation, tier] = ship;

    return ( 
        <div className="shpi-list-item">
            {/* {name} */}
        </div>
    )
};


export default ShipListCard;