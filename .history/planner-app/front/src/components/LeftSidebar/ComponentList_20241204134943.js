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
};

const ListItem = ({item}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <li>
            <button onClick={toggleOpen} style={{cursor: 'pointer'}}>

            </button>
        </li>
    )
}

export ComponentList;