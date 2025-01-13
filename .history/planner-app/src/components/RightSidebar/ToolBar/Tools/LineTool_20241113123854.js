import React, { useEffect } from 'react';

const LineTool = ({ isActive, onClick }) => {
    useEffect(() => {
        if (isActive) {
            console.log('Select tool activated');
        }
    }, [isActive]);

    return (
        <button
            style={{ background: isActive ? 'blue' : 'grey' }}
            onClick={onClick}
        >
            Select Tool
        </button>
    );
};

export default SelectTool;
