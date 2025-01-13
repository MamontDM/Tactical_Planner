import React, { useEffect } from 'react';

const ShipListCard =({data, numberOfItems}) => {
    
    useEffect(() => {
        console.log("data is coming", data);
    },[data, numberOfItems]);

    return (

    );
};


export default ShipListCard;