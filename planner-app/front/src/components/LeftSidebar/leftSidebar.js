import React from 'react';
import MapSelector from './ComponentList/MapSelector/mapSelector';
import PlannerHelper from './ComponentList/PlannerHelper/plannerHelper';
import ComponentList from './ComponentList/componentList';
import UserCard from './ComponentList/UserCard/UserCard';

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
                <UserCard />
                <ComponentList components={components}/>
            </div>
    );
};



export default LeftSidebar;