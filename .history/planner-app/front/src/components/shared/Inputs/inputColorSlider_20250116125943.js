import React from 'react';

const GradiendColorInput = () => {

    const gradientColors = [
        { r: 255, g: 0, b: 0 },
        { r: 255, g: 255, b: 0 }, 
        { r: 0, g: 255, b: 0 },  
        { r: 0, g: 0, b: 255 } 
    ]

    return ( 
        <div className="gradient-input">
            <input
                type="range"
                min="0"
                max="100"
                value="50"
                onChange={(e) => }
            ></input>
        </div>

    )
};

default export GradiendColorInput;