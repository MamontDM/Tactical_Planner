import React from 'react';
import PropTypes from 'prop-types';

function ToolbarButton({onClick, isActive, className = '', disabled = false}){
    return (
        <li 
            className = {`${className} ${isActive ?  'active' : ''}`}
            id= {id}
            label={label}
            onClick={() => { onClick(id);
            }}
            >
            </li>
    );
}

export default ToolbarButton;