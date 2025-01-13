import React, { useEffect, useState } from 'react';

const ShipListCard =({data, numberOfItems}) => {
    
    const [listOfItems, setListOfItems] = useState([]);
    const [shipData, setShipData] = useState();


    useEffect(() => {
        setListOfItems(numberOfItems);
    },[data, numberOfItems]);

    return (
        {numberOfItems.map}
    )
};


export default ShipListCard;