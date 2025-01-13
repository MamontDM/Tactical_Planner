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
  const isCurrentlyOpen = activeId === item.id;

    const toggleOpen = () => {
        setActiveId(currentlyOpen ? null : item.id);
    };

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