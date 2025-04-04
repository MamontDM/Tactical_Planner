import React, {useContext, useCallback} from 'react';
import './toolbar.css';
import ToolbarButton from '../../shared/ToolbarButton.jsx';
import toolsConfig from './toolsConfig.jsx';
import AuthContext from '../../contexts/AuthContext';
import ToolSettings from '../ToolSettings/ToolSetting';
import {useActiveToolStore} from '@/store/zustand/Toolbar/activeToolStore';
import { useMapStore } from '../../../store/zustand/MapStore/mapStore';
import UndoRedoControls from './Tools/UndoRedoTools/UndoRedo';


const Toolbar = () =>  {
    const activeToolId = useActiveToolStore((state) => state.activeTool);
    const setActiveTool = useActiveToolStore((state) => state.setActiveTool);
    const clearActiveTool = useActiveToolStore((state) => state.clearActiveTool);
    const isMapActive = useMapStore((state) => state.selectedMapId);
    const { isAuthenticated } = useContext(AuthContext);
    
    const handleToolClick = (id) => {
        if(id === activeToolId){
            clearActiveTool();
        }else{
            setActiveTool(id);
        }
            
    };

    const handleToolDeactivation = useCallback(() => {
        clearActiveTool();
    },[]);
    
      return (  
        <div className={`toolbar ${!isMapActive ? 'blocked' : ''}`}>
            <div className="toolbar-block-section">
                {toolsConfig.map((tool) => (
                    <ToolbarButton
                        key={tool.id}
                        isActive={activeToolId === tool.id}
                        className={`toolbar-button-${tool.id} ${tool.id === 'save' &&  !isAuthenticated ? 'blocked' : ''}`}
                        id={tool.id}
                        icon={tool.icon}
                        label={tool.label}
                        onClick={() => handleToolClick(tool.id)}
                    />
                ))}
                 <UndoRedoControls />
            </div>
            {toolsConfig.map((tool) => activeToolId === tool.id &&  (
                <tool.component
                        key={tool.id}
                        className='active'
                        isActive={true}
                        type={tool.id}
                        onDeactivate={handleToolDeactivation}
            />
            ))}
            {activeToolId && <ToolSettings />}
           
        </div>
    );
};

export default Toolbar;