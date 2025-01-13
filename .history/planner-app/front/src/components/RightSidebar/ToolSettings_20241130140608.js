import React from 'react';
import ReactDOM from 'react-dom';

const ToolSetting = ({ commonSettings, onChangeCommonSettings, activeToolId }) =>{
if (!activeToolId){
    return null;
}
    return (
        <div className="tool-settings">
            <div className="common-settings">
                <label>
                    Line width:
                    <input
                        type="number"
                        value={commonSettings.lineWidth}
                        onChange={(e) => onChangeCommonSettings({lineWidth: e.target.value})
                        }
                    /> 
                </label>
                <label>
                    Color:
                    <input
                        type="color"
                        value={commonSettings.color}
                        onChange={(e) => onChangeCommonSettings({color: e.target.value})
                    }
                    />
                </label>
            </div>
            <div id="specific-settings" className="specific-tool-settings">
             </div>
    </div>
    );
};

   

export default ToolSetting;