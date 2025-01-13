
const ListItem = () => {

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

export default ListItem;