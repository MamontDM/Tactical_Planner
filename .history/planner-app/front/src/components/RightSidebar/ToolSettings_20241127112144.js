import React from 'react'

const ToolSetting = ({activateTool, settings, onChange}) =>{
    if (!activeTool) return null;
};
return (
    <div className="tool-settings">
        {activateTool === "line" &&(
            <div>
                <label>LineTool setting:</label>
                <input
                    type="range"
                    min="2"
                    max="5"
                    value={settings.lineWidth}
                    onChange={(e) =>
                    onChange({...settings, lineWidth: e.target.value})
        }                
            />
            </input>
        )}
    </div>
)

export default ToolSetting;