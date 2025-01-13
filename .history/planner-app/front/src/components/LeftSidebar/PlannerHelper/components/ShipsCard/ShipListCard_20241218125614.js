import React, { useEffect, useState } from 'react';

const ShipListCard = ({ ship }) => {

    if (!ship) {
        console.log('called')
        return (
          <div className="ship-list-empty">
            <p>Empty slot</p>
          </div>
        );
      }

    const {name, tier, nation, class: shipClass} = ship;

    return ( 
        <div className="shpi-list-item">
            {name} {tier}
        </div>
    )
};


export default ShipListCard;