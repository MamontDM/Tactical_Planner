import React from 'react';

function ListItem({id, className, label}){
    return (
        <button>
        <li 
            className = {`${className}`}
            id= {id}
            label={label}
            >
        </li>
        </button>
    );
}

export default ListItem;