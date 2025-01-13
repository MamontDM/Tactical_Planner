import React, { useState } from "react";

const ComponentList = ({components}) => {
    
    const renderList = (items) => {
        return (
            <div className="components-wrapper">
                {items.map((item) => (
                    <ListItem 
                        key={item.id} 
                        item={item}
                        isActive={item.id}
                    />
                ))}
            </div>
        );
    };

const ListItem = ({item, isActive}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
    
    console.log(isActive);

    return (
        <div className="component-list">
            <button className={`list-button ${isActive ? 'active' : ''}`} 
            onClick={toggleOpen}
            style={{
                cursor: 'pointer',
                }}
                >
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