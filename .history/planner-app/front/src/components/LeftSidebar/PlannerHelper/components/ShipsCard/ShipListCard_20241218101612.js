import React, { useEffect } from 'react';

const ShipListCard =({data, numberOfItems}) => {
    
    useEffect(() => {
        console.log("data is coming", data);
        console.log("number of Items is ", numberOfItems);
    },[data, numberOfItems]);

    return (

    );
};


export default ShipListCard;