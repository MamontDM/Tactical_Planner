import React from 'react';

const GradiendColorInput = () => {


    return ( 
        <div className="gradient-input">
            <input
                type="range"
                min="0"
                max="100"
                value="50"
            ></input>
        </div>

    )
};

default export GradiendColorInput;