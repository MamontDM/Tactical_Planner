import React from 'react';

function ListItem({id, className, label}){
    return (
        <li 
            className = {`${className}`}
            id= {id}
            label={label}
            >
                <input
                    type="checkbox">
                </input>
        </li>
            
    );
}

export default ListItem;