import React, { useState } from "react";

const ComponentList = ({components}) => {
    const renderList = (items) => {
        return (
            <ul>
                {items.map((item) => (
                    <ListItem key={item.id} item={item} />
                ))}
            </ul>
        );
    };

const ListItem = ({item}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <li>
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
        </li>
    );
};
    return <div>{renderList(components)}</div>;
}


export default ComponentList;