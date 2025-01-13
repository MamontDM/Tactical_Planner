import React, {useState} from 'react';
import ToolbarButton from '../../shared/ToolbarButton.js';
import {battleship, curves, download, eraser, flopik, IconLeft, IconRight, line, radar, select, technical, text, trash, vision} from '../../../assets/exportIcon';

const Toolbar = () =>  {
    const [activeToolId, setActiveTool] = useState(null); 
    
    const handleToolClick = (id) => {
        if (activeToolId === id) {
            setActiveTool(null);
            console.log('AlreadY activated');
        } else {
            setActiveTool(id);
            console.log('activated');
        }
    };
    const toolGroup1 = [
        { id: 'select', label: 'Select', icon: select },
    ];
    const toolGroup2 = [
        { id: 'line', label: 'Line', icon: line},
        { id: 'tech', label: 'Tech', icon: technical},
        { id: 'curve', label: 'Curve', icon: curves},
    ];
    const toolGroup3 = [
        { id: 'text', label: 'Text', icon: text},
    ];
    const toolGroup4 = [
        { id: 'undo', label: 'Undo', icon: IconLeft },
        { id: 'battleship', label: 'Battleship', icon: battleship},
        { id: 'vision', label: 'Vision', icon: vision},
        { id: 'radar', label: 'Radar', icon: radar },
        { id: 'redo', label: 'Redo', icon: IconRight},
    ];
    const toolGroup5 = [
        { id: 'erase', label: 'Erase', icon: eraser },
        { id: 'save', label: 'Save', icon: flopik },
        { id: 'download', label: 'Download', icon: download},
    ];
    const toolGroup6 = [
        { id: 'trash', label: 'Trash', icon: trash },
    ];
      return (  
      <div  className="toolbar">
                <div className="toolbar__row">
                    {toolGroup1.map(tool =>(
                        <ToolbarButton 
                       key={tool.id}
                       className = 'toolbar-button'
                       id= {tool.id}
                       icon= {tool.icon}
                       label={tool.label}
                       isActive={activeToolId === tool.id}
                       onClick={() => handleToolClick(tool.id)}
                    />
                    ))}
                </div>
                <div className="toolbar__row">
                    {toolGroup2.map(tool =>(
                        <ToolbarButton 
                       key={tool.id}
                       className = 'toolbar-button'
                       id= {tool.id}
                       icon= {tool.icon}
                       label={tool.label}
                       isActive={activeToolId === tool.id}
                       onClick={() => handleToolClick(tool.id)}
                    />
                    ))}
                </div>
                <div className="toolbar__row">
                    {toolGroup3.map(tool =>(
                        <ToolbarButton 
                       key={tool.id}
                       className = 'toolbar-button'
                       id= {tool.id}
                       icon= {tool.icon}
                       label={tool.label}
                       isActive={activeToolId === tool.id}
                       onClick={() => handleToolClick(tool.id)}
                    />
                    ))}
                </div>
                <div className="toolbar__row">
                    {toolGroup4.map(tool =>(
                        <ToolbarButton 
                       key={tool.id}
                       className = 'toolbar-button'
                       id= {tool.id}
                       icon= {tool.icon}
                       label={tool.label}
                       isActive={activeToolId === tool.id}
                       onClick={() => handleToolClick(tool.id)}
                    />
                    ))}
                </div>
                <div className="toolbar__row">
                    {toolGroup5.map(tool =>(
                        <ToolbarButton 
                       key={tool.id}
                       className = 'toolbar-button'
                       id= {tool.id}
                       icon= {tool.icon}
                       label={tool.label}
                       isActive={activeToolId === tool.id}
                       onClick={() => handleToolClick(tool.id)}
                    />
                    ))}
                </div>
            </div>
      )
};

export default Toolbar;