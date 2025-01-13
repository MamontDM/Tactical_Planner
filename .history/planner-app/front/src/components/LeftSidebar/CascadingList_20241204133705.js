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

export CascadingList;