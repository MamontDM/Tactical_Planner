import React from 'react';


const ShipListCard = ({ship}) => {
console.log(`'hello`);
    return ( 
        <div>
            {ship.map(({class: className, id, images, name, tier, nation}) => (
                <div key={id} className="ship-list-item">
                    {nation}{name} {tier} 
                </div>
            ))}
        </div>
    )
};


export default ShipListCard;