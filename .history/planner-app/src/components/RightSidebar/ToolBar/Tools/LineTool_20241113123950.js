import React, { useEffect } from 'react';

const LineTool = ({ isActive, onClick }) => {
    useEffect(() => {
        if (isActive) {
            activate();
        }
    }, [isActive]);


    function activate(){
        console.log('hello');
    }

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
