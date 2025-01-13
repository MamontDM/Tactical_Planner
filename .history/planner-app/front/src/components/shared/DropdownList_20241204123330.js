import React from 'react';

function DropdownList({id, className, label}){
    return (
        <button 
            className = {`${className}`}
            id= {id}
            label={label}
            >
        </button>
            
    );
}

export default DropdownList;