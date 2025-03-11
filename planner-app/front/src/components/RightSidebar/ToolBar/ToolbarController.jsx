import React, {useContext, useCallback} from 'react';
import './toolbar.css';
import ToolbarButton from '../../shared/ToolbarButton.jsx';
import toolsConfig from './toolsConfig.jsx';
import { MapContext } from '../../contexts/MapSelectorContext.jsx';
import AuthContext from '../../contexts/AuthContext';
import ToolSettings from '../ToolSettings/ToolSetting';
import useActiveToolStore from '../../../store/zustand/Toolbar/activeToolStore';


const Toolbar = () =>  {
    const activeToolId = useActiveToolStore((state) => state.activeTool);
    const setActiveTool = useActiveToolStore((state) => state.setActiveTool);
    const clearActiveTool = useActiveToolStore((state) => state.clearActiveTool);

    const { isAuthenticated } = useContext(AuthContext);
    const {isMapActive } = useContext(MapContext);
    
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