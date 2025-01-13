import React from 'react';

function ListItem({onClick, isActive, className = '', disabled = false}){
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

export default ListItem;