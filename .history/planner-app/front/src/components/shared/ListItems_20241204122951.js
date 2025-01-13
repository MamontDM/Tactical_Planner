import React from 'react';

function ListItem({id, className, label}){
    return (
        <ul 
            className = {`${className}`}
            id= {id}
            label={label}
            >
        </ul>
            
    );
}

export default ListItem;