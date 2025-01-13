import React, { useState, useEffect } from "react";

const ComponentList = ({components}) => {
    
    const [activeId, setActiveId] = useState(null);

    const renderList = (items) => {
        return (
            <div className="components-wrapper">
                {items.map((item) => (
                    <ListItem 
                        key={item.id} 
                        item={item}
                        isActive={activeId === item.id}
                        setActiveId={setActiveId}
                    />
                ))}
            </div>
        );
    };

const ListItem = ({item, isActive, setActiveId}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
  

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
            {isCurrentlyOpen && item.children && (
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