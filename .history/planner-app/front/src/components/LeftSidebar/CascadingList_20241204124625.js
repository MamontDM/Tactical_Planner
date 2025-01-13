import React, { useState } from "react";

const CascadingList = ({data}) => {
    const renderList = (items) => {
        return (
            <ul>
                {items.map((item) => (
                    <ListItem key={item.id} item={item}/>
                ))}
            </ul>
        );
    };

    const ListItem = ({ item }) => {
        const [isOpen, setIsOpen] = useState(false);
       
        const toggleOpen = () => setIsOpen(!isOpen);
    }







}