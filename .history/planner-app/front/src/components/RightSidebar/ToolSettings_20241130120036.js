import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const ToolSetting = ({ commonSettings, onChangeCommonSettings, activeToolId }) =>{
if(activeToolId === null) return;
    return (
        <div clasName="tool-settings">
            <div clasName="common-settings">
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
        {ReactDOM.createPortal(
            <div id="specific-toolsSet">
            </div>, 
            document.getElementById('specific-toolsSet')
        )}
    </div>
    );
};

   

export default ToolSetting;