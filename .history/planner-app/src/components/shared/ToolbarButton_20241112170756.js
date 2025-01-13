import React from 'react';
import PropTypes from 'prop-types';

function ToolbarButton({id, icon, label, onClick, isActive, className = '', disabled = false}){
    return (
        <button 
            className = {`${className} ${isActive ?  'active' : ''}`}
            id= {id}
            icon= {icon}
            label={label}
            onClick={() => onClick(id)}
            disabled={true} 
            >
                {icon && <img src={icon} alt={label} className="toolbar-icon"/>}
            </button>
    );
}
    ToolbarButton.propTypes = {
        id: PropTypes.string.isRequired,
        icon: PropTypes.string,
        label: PropTypes.string,
        onClick: PropTypes.func,
        isActive: PropTypes.bool,
        className: PropTypes.string,
        disabled: PropTypes.bool,
    };

export default ToolbarButton;