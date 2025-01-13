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

    const tools = [
        { id: 'line', label: 'Line', icon: line},
        { id: 'tech', label: 'Tech', icon: technical},
        { id: 'curve', label: 'Curve', icon: curves},
        { id: 'text', label: 'Text', icon: text},
        { id: 'move', label: 'Move', icon: select},
        { id: 'battleship', label: 'Battleship', icon: battleship},
        { id: 'vision', label: 'Vision', icon: vision},
        { id: 'radar', label: 'Radar', icon: radar },
        { id: 'erase', label: 'Erase', icon: eraser },
        { id: 'select', label: 'Select', icon: select },
        { id: 'undo', label: 'Undo', icon: IconLeft },
        { id: 'redo', label: 'Redo', icon: IconRight},
        { id: 'trash', label: 'Trash', icon: trash },
        { id: 'save', label: 'Save', icon: flopik },
        { id: 'download', label: 'Download', icon: download},
    ];

      return (  
      <nav  className="toolbar">
                <div className="toolbar__row">
                    {tools.map(tool =>(
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
            </nav>
      )
};

export default Toolbar;