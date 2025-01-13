import React from 'react'

const ToolSetting = ({activateToolId, settings, onChange}) =>{
    if (!activeTool) return null;

return (
    <div className="tool-settings">
        {activateTool === 'line' && (
            <div>
                <label>Line Tool Set:</label>
                <input 
                    type="range"
                    min="2"
                    max="10"
                    value={settings.lineWidth}
                    onChange={(e) => 
                        onChange({...settings, lineWidth: e.target.velue})
                    }
                />
            </div>
        )}
    </div>
  );
};

   

export default ToolSetting;