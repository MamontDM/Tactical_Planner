import React from 'react';

function ListItem({id, className, label}){
    return (
        <button 
            className = {`${className}`}
            id= {id}
            label={label}
            >
        </button>
            
    );
}

export default ListItem;