import React from 'react';

function ListItem({onClick, isActive, className = '', disabled = false}){
    return (
        <li 
            id= {id}
            label={label}
            onClick={() => { onClick(id);
            }}
            >
            </li>
    );
}

export default ListItem;