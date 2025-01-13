import React, { useEffect, useState } from 'react';

const ShipListCard =({data, numberOfItems}) => {
    
    const [listOfItems, setListOfItems] = useState([]);
    const [shipData, setShipData] = useState();


    useEffect(() => {
      
    },[data, numberOfItems]);

    return null;
};


export default ShipListCard;