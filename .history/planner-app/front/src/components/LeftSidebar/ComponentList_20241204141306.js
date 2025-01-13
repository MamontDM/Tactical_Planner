import React, { useState } from "react";

const ComponentList = ({components}) => {
    console.log(JSON.stringify(components));
    const renderList = (items) => {
        return (
            <div className="components-wrapper">
                {items.map((item) => (
                    <ListItem  item={item} />
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
                {item.name} 
            </button>
            {isOpen && item.children && (
          <>
            {React.isValidElement(item.children) ? (
              item.children 
            ) : (
              renderList(item.children)
            )}
          </>
        )}
        </div>
    );
};
    return <div>{renderList(components)}</div>;
}


export default ComponentList;