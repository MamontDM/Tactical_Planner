import React from 'react';
import Toolbar from './ToolBar/ToolbarController';
import MapLegend from './MapsLegend/MapLegend';
import ComponentList from "../shared/ComponentList/componentList"
import { useMapStore } from '../../store/zustand/MapStore/mapStore';


const RightSidebar = () =>{

    const isMapAvaliable = useMapStore((state) => state.selectedMapId)


    const components1 = [
        {  id: 1,
            name: 'Toolbar',
            children: <Toolbar />,
        },
        ...(isMapAvaliable !== null ?
        [{  
            id: 2,
            name: 'Map Legend',
            children: <MapLegend />,
        }] : []
      ),
    ];



    return (
        <div id="rightSidebar" className="right-sidebar">
           <ComponentList components={components1}/>
        </div>
    );
};

export default RightSidebar;