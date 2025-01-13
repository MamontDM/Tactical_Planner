import React, { useState } from "react";

const ComponentList = ({components}) => {

    const [open, setIsOpen] = useState({});
    const toogleOpen = (id) => {
        setIsOpen((prev) => ({
            ...prev,
            [id]: !prev[id],

        }));
    };

    const renderList = (items) => {
        return (
            <div className="components-wrapper">
                {items.map((item) => (
                    <ListItem 
                        key={item.id} 
                        item={item}
                        isOpen={open[item.id] || false}
                        toggleOpen={() => toogleOpen(item.id)}
                    />
                ))}
            </div>
        );
    };
    <div>{renderList(components)}</div>
};


const ListItem = ({item, isOpen, toggleOpen}) => {
    return (
        <div className="component-list">
                <button
                    className={`list-button ${isOpen? : "active" : ''}`}
                    onClick={toggleOpen}
                    style={{cursor: 'pointer'}}
                    >
                        {item.name}
                </button>
        </div>
    )
}

export default ComponentList;