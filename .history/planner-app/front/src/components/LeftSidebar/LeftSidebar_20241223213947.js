import React, {useState, useRef} from 'react';
import MapSelector from './MapSelector/mapSelector';
import PlannerHelper from './PlannerHelper/PlannerHelper';
import ComponentList from './ComponentList';

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
    ]

    return (
        <div className="left-sidebar">
            <ComponentList components={components}/>
        </div>
    );
};



export default LeftSidebar;