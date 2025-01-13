import React, { useState } from "react";

const ComponentList = ({components}) => {

    const [open, setIsOpen] = useState({});
    const toogleOpen = (id) => {
        
    }
    

    const renderList = (items) => {
        return (
            <div className="components-wrapper">
                {items.map((item) => (
                    <ListItem 
                        key={item.id} 
                        item={item}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="component-list">
            <button className={`list-button ${isOpen ? 'active' : ''}`} 
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