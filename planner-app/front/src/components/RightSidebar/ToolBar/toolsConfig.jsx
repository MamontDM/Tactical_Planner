 import LineTool from './Tools/LineTool/LineTool.jsx';
 import EraiserTool from './Tools/EraiserTool/EraiserTool.jsx';
 import MoveTool from './Tools/MoveTool/MoveTool.jsx';
 import StraightLine from './Tools/StraightLine/StraightLine.jsx';
 import CurveTool from './Tools/CurveTool/CurveTool.jsx';
 import VisionTool from './Tools/VisionTool/VisionTool.jsx';
 import RadarTool from './Tools/RadarTool/RadarTool.jsx';
 import IconTool from './Tools/IconTool/IconTool.jsx';
 import ClearTool from './Tools/ClearTool/ClearTool.jsx';
 import DownLoadTool from './Tools/DownLoadTool/DownLoadTool.jsx';
 import TextTool from './Tools/TextTool/TextTool.jsx';
 import BaseAreaTool from './Tools/BaseAreaTool/BaseArea.jsx';
 import {battleship, curves, baseArea, download, eraser, flopik, IconLeft, IconRight, line, radar, select, technical, text, trash, vision} from '../../../assets/exportIcon.js';
import SaveTool from './Tools/SaveTool/SaveTool.jsx';

 
 
 const toolsConfig = [
        { id: 'select', label: 'Select', icon: select, component: MoveTool },
        { id: 'line', label: 'Pen', icon: line, component: LineTool },
        { id: 'tech', label: 'Ruler', icon: technical, component: StraightLine},
        { id: 'curve', label: 'Curve', icon: curves, component: CurveTool },
        { id: 'text', label: 'Text', icon: text, component: TextTool },
        { id: 'eraser', label: 'Eraser', icon: eraser, component: EraiserTool},
        { id: 'icon', label: 'icon', icon: battleship, component: IconTool},
        { id: 'vision', label: 'Vision', icon: vision, component: VisionTool},
        { id: 'radar', label: 'Radar', icon: radar, component: RadarTool},
        { id: 'base', label: 'Base', icon: baseArea, component: BaseAreaTool},
        { id: 'save', label: 'Save', icon: flopik, component: SaveTool},
        { id: 'download', label: 'Load', icon: download, component: DownLoadTool},
        { id: 'trash', label: 'Trash', icon: trash, component: ClearTool},
    ];

    export default toolsConfig;