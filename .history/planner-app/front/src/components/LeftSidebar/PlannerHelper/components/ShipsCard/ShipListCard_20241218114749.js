import React, { useEffect, useState } from 'react';

const ShipListCard =({ship}) => {
    
    const [listOfItems, setListOfItems] = useState([]);
    const [shipData, setShipData] = useState();


    useEffect(() => {
        setListOfItems(numberOfItems);
    },[data, numberOfItems]);

    return null;
};


export default ShipListCard;