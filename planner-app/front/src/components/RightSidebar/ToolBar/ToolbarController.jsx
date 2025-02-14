import React, {useState, useContext, useCallback} from 'react';
import './toolbar.css';
import ToolbarButton from '../../shared/ToolbarButton.jsx';
import toolsConfig from './toolsConfig.jsx';
import { MapContext } from '../../contexts/MapSelectorContext.jsx';
import AuthContext from '../../contexts/AuthContext';


const Toolbar = () =>  {
    const [activeToolId, setActiveTool] = useState(null); 
    const {isMapActive} = useContext(MapContext);
    const { isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated);
    
    const handleToolClick = (id) => {
            setActiveTool((prevId) => (prevId === id ? null : id));
    };

    const handleToolDeactivation = useCallback(() => {
        console.log('razmontaj')
        setActiveTool(null);
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
        </div>
    );
};

export default Toolbar;