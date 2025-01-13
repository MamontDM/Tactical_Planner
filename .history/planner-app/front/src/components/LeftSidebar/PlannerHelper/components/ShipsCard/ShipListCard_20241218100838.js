import React, { useEffect } from 'react';

const ShipListCard =({data}) => {
    
    useEffect(() => {
        console.log("data is coming", data);
    },[data]);

    return null;
};


export default ShipListCard;