import React, { useState, useEffect } from 'react';
import "./toolSettings.css";
import CommonSettings from "./CommonSettings/ColorAndWidthSet";
import IconToolSettings from "../ToolSettings/ComponentSettings/IconTool/IconToolSetting";
import BaseToolSettings from "./ComponentSettings/BaseTool/BaseToolSettings";
import RadarToolSettings from "../ToolSettings/ComponentSettings/RadarTool/RadarToolSetting";
import TextToolSettings from "../ToolSettings/ComponentSettings/TextTool/TextToolSettings";
import useActiveToolStore from '../../../store/zustand/Toolbar/activeToolStore';


const settingComponentsList = {
    icon: IconToolSettings,
    text: TextToolSettings,
    radar: RadarToolSettings,
    base: BaseToolSettings,
};


const ToolSettings = () => {
   const activeTool = useActiveToolStore((state) => state.activeTool);
   const SpecificSettings = settingComponentsList[activeTool];

    return  ( 
        <>
          {!["icon", "select", "eraser", "save", "download"].includes(activeTool) && <CommonSettings />}
          {SpecificSettings && <SpecificSettings />}
        </>
    )

};

export default ToolSettings;