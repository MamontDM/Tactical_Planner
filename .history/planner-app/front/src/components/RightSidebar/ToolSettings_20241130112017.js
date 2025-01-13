import React from 'react'

const ToolSetting = ({activateTool, settings, specificToolSettings}) =>{
    if (!activateTool) return null;

return (
    <div className="tool-settings">
        {activateTool !== 'icon' && (
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