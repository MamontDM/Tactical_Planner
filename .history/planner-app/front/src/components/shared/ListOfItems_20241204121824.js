import React from 'react';
import PropTypes from 'prop-types';

function ToolbarButton({onClick, isActive, className = '', disabled = false}){
    return (
        <button 
            className = {`${className} ${isActive ?  'active' : ''}`}
            id= {id}
            label={label}
            onClick={() => { onClick(id);
            }}
            >
                {icon && <img src={icon} alt={label} className="toolbar-icon"/>}
            </button>
    );
}
    ToolbarButton.propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        onClick: PropTypes.func,
        isActive: PropTypes.bool,
        className: PropTypes.string,
        disabled: PropTypes.bool,
    };

export default ToolbarButton;