import React, { useEffect } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';

const LineTool = ({isActive}) => {

   















    useEffect(() => {
        if (isActive) {
            activate();
        }
    }, [isActive]);

    const activate = () => {
        console.log('hello');
    }

    return (null);
};

export default LineTool;
