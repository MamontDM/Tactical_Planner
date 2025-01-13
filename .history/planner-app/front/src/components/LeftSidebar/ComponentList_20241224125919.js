import React, { useState } from "react";

const ComponentList = ({components}) => {

    const [open, setIsOpen] = useState({});
    const toogleOpen = (id) => {
        setIsOpen((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="components-wrapper">
            {components.map((item) => (
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


const ListItem = ({item, isOpen, toggleOpen}) => {

    const hasChildren = React.isValidElement(item.children);
    return (
        <div className="component-list">
                <button
                    className={`list-button ${isOpen ? "active" : ''}`}
                    onClick={toggleOpen}
                    style={{cursor: hasChildren ?  'pointer' : 'default'}}
                    disabled={!hasChildren}
                    >
                        {item.name}
                </button>

                {isOpen &&  hasChildren && item.children}
        </div>
    );
};

export default ComponentList;