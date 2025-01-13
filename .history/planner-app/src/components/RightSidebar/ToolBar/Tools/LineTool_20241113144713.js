import React, { useEffect } from 'react';

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
