import React from 'react';

const ShipListCard =({data}) => {
    useEffect(() => {
        console.log("data is coming", data);
    },[data]);
};

export ShipListCard;