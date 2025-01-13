import React, { useEffect, useState } from 'react';

const ShipListCard = ({ship}) => {
    const  {id, images, name, nation, tier} = ship;

    console.log(images);
    console.log(name);

    return ( 
        <div className="shpi-list-item">
            {/* {name} */}
        </div>
    )
};


export default ShipListCard;