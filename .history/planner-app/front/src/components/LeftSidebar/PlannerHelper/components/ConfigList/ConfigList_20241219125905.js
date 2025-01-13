import React from 'react';

const ConfigList = ({props}) => {
    const { limitations, ...shipCongif } = props;

    console.log(limitations);
    console.log(shipCongif);
};

export default ConfigList;