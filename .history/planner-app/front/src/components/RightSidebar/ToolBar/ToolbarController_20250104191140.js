import React, {useState, useContext} from 'react';
import './toolbar.css';
import AppContext from '../../contexts/appContext';
import ToolbarButton from '../../shared/ToolbarButton.js';
import {battleship, curves, download, eraser, flopik, IconLeft, IconRight, line, radar, select, technical, text, trash, vision} from '../../../assets/exportIcon';
import LineTool from './Tools/LineTool/LineTool.js';
import EraiserTool from './Tools/EraiserTool/EraiserTool.js';
import MoveTool from './Tools/MoveTool/MoveTool.js';
import StraightLine from './Tools/StraightLine/StraightLine.js';
import CurveTool from './Tools/CurveTool/CurveTool.js';
import UndoTool from './Tools/UnDoTool/UnDo.js';
import ReDoTool from './Tools/ReDoTool/ReDo.js';
import VisionTool from './Tools/VisionTool/VisionTool.js';
import RadarTool from './Tools/RadarTool/RadarTool.js';
import IconTool from './Tools/IconTool/IconTool.js';
import ClearTool from './Tools/ClearTool/ClearTool.js';
import DownLoadTool from './Tools/DownLoadTool/DownLoadTool.js';
import ToolSettings from './ToolSettings/ToolSettings.js';
import TextTool from './Tools/TextTool/TextTool.js';


const Toolbar = () =>  {
    const { canDraw } = useContext(AppContext);
    const [activeToolId, setActiveTool] = useState(null); 
    const [commonSettings, setCommonSettings] = useState({
        lineWidth: 2,
        color: '#fffccc',
      });
    const [toolSettings, setToolSettings] = useState({
        icon:  { shipType: null, fillColor: '#fff000', shipLabel: 'USS' },
        line:  { color: '#000', lineWidth: 2 },
        radar: { radius: 100 },
        text:  { textBody: 'test', fontSize: '16', textColor: '#fff000'},
    });

    const handleToolSettingsChange = (toolId, newSettings) => {
        setToolSettings((prev) => ({
            ...prev,
            [toolId]: {
                ...prev[toolId],
                ...newSettings,
            },
        }));
    };

    const handleToolClick = (id) => {
        console.log(`Clicked:  ${id}`);
        setActiveTool((prevId) => (prevId === id ? null : id));
    };
    const handleToolDeactivation = () => {
        console.log('emidietly deactivate')
        setActiveTool(null);
    };
    
    const handleCommonSettingsChange = (newSettings) => {
        setCommonSettings((prev) => ({ ...prev, ...newSettings }));
      };

    const commonProps = {
        commonSettings: commonSettings,
        onChangeCommonSettings: handleCommonSettingsChange,
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
        { id: 'eraiser', label: 'Eraiser', icon: eraser },
        { id: 'redo', label: 'Redo', icon: IconRight},
    ];
    const toolGroup5 = [
        { id: 'battleship', label: 'Battleship', icon: battleship},
        { id: 'vision', label: 'Vision', icon: vision},
        { id: 'radar', label: 'Radar', icon: radar },
    ];
    const toolGroup6 = [
        { id: 'save', label: 'Save', icon: flopik },
        { id: 'download', label: 'Download', icon: download},
    ];
    const toolGroup7 = [
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
                       disabled={!canDraw}
                    />
                    ))}
                    <MoveTool isActive={activeToolId === 'select'} />
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
                       disabled={!canDraw}
                    />
                    ))}
                    <LineTool 
                        isActive={activeToolId === 'line'}
                        {...commonProps}
                    />
                    <StraightLine 
                        isActive={activeToolId === 'tech'}
                        {...commonProps}/>
                    
                    <CurveTool 
                        isActive={activeToolId === 'curve'}
                        {...commonProps}/>

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
                    <TextTool 
                        isActive={activeToolId === 'text'}
                        settings={toolSettings['text']} 
                        />
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
                    <UndoTool 
                        isActive={activeToolId === `undo`}
                        onDeactivate={handleToolDeactivation}/>
                    <EraiserTool isActive={activeToolId === 'eraiser'}/>
                    <ReDoTool 
                        isActive={activeToolId === 'redo'}
                        onDeactivate={handleToolDeactivation}/>
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
                    <IconTool 
                        isActive={activeToolId === 'battleship'}
                        settings={toolSettings['battleship']}
                        />
                    <VisionTool 
                        isActive={activeToolId === 'vision'}
                        {...commonProps}/>
                    <RadarTool 
                        isActive={activeToolId === 'radar'}
                        {...commonProps}/>
                </div>
                <div className="toolbar__row">
                    {toolGroup6.map(tool =>(
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
                    <DownLoadTool 
                        isActive={activeToolId === 'download'}
                        onDeactivate={handleToolDeactivation}/>
                </div>
                <div className="toolbar__row">
                    {toolGroup7.map(tool =>(
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
                    <ClearTool 
                        isActive={activeToolId === 'trash'}
                        onDeactivate={handleToolDeactivation}
                        />
            </div>
            <ToolSettings
                activeToolId={activeToolId}
                commonSettings={commonSettings}
                onChangeCommonSettings={handleCommonSettingsChange}
                toolSettings={toolSettings[activeToolId]}
                onChangeToolSettings={(newSettings) => handleToolSettingsChange(activeToolId, newSettings)}
            />
        </div>
    );
};

export default Toolbar;