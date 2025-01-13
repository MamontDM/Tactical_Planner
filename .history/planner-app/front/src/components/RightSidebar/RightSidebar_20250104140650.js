import React from 'react';
import Toolbar from './ToolBar/ToolbarController';
import './RightSidebar.css';


const RightSidebar = () =>{
    return (
        <div id="rightSidebar" className="right-sidebar">
           <Toolbar /> 
        </div>
    );
};

export default RightSidebar;