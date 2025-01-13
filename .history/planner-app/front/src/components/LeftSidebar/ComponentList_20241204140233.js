import React, { useState } from "react";

const ComponentList = ({components}) => {
    const renderList = (items) => {
        return (
            <div className="components-menu">
                {items.map((item) => (
                    <ListItem key={item.id} item={item} />
                ))}
            </div>
        );
    };

const ListItem = ({item}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="component-list">
            <button onClick={toggleOpen} style={{cursor: 'pointer'}}>
                {item.name} {item.children.lenght> 0 && (isOpen ? '[-]' : '[+]')}
            </button>
            {isOpen && item.children && (
          <div style={{ marginLeft: "20px" }}>
            {React.isValidElement(item.children) ? (
              item.children 
            ) : (
              renderList(item.children)
            )}
          </div>
        )}
        </div>
    );
};
    return <div>{renderList(components)}</div>;
}


export default ComponentList;