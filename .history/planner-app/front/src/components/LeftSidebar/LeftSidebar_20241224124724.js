import React, {useState, useRef} from 'react';
import MapSelector from './MapSelector/mapSelector';
import PlannerHelper from './PlannerHelper/PlannerHelper';
import ComponentList from './ComponentList';
import ClickToBase from './ClickToBase';

const LeftSidebar = () => {

    const components = [
        {  id: 1,
            name: 'Map Selector',
            children: <MapSelector />,
        },
        {  
            id: 2,
            name: 'Planner Helper',
            children: <PlannerHelper />,
        },
        {  
            id: 3,
            name: 'Click to Base',
            children: <ClickToBase />,
        },
    ]

    return (
        <div className="left-sidebar">
            <ComponentList components={components}/>
        </div>
    );
};



export default LeftSidebar;