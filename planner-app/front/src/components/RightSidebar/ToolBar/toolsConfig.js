 import LineTool from './Tools/LineTool/LineTool.js';
 import EraiserTool from './Tools/EraiserTool/EraiserTool.js';
 import MoveTool from './Tools/MoveTool/MoveTool.js';
 import StraightLine from './Tools/StraightLine/StraightLine.js';
 import CurveTool from './Tools/CurveTool/CurveTool.js';
 import UndoTool from './Tools/UnDoTool/UnDo.js';
 import ReDoTool from './Tools/ReDoTool/ReDo.js';
 import VisionTool from './Tools/VisionTool/VisionTool.js';
 import RadarTool from './Tools/RadarTool/RadarTool.js';
 import IconTool from './Tools/IconTool/IconTool.js';
 import ClearTool from './Tools/ClearTool/ClearTool.js';
 import DownLoadTool from './Tools/DownLoadTool/DownLoadTool.js';
 import TextTool from './Tools/TextTool/TextTool.js';
 import {battleship, curves, download, eraser, flopik, IconLeft, IconRight, line, radar, select, technical, text, trash, vision} from '../../../assets/exportIcon';
 
 
 const toolsConfig = [
        { id: 'select', label: 'Select', icon: select, component: MoveTool },
        { id: 'line', label: 'Line', icon: line, component: LineTool },
        { id: 'tech', label: 'Tech', icon: technical, component: StraightLine},
        { id: 'curve', label: 'Curve', icon: curves, component: CurveTool },
        { id: 'text', label: 'Text', icon: text, component: TextTool },
        { id: 'undo', label: 'Undo', icon: IconLeft, component: UndoTool},
        { id: 'eraiser', label: 'Eraiser', icon: eraser, component: EraiserTool},
        { id: 'redo', label: 'Redo', icon: IconRight, component: ReDoTool},
        { id: 'icon', label: 'icon', icon: battleship, component: IconTool},
        { id: 'vision', label: 'Vision', icon: vision, component: VisionTool},
        { id: 'radar', label: 'Radar', icon: radar, component: RadarTool},
        { id: 'save', label: 'Save', icon: flopik, component: MoveTool},
        { id: 'download', label: 'Download', icon: download, component: DownLoadTool},
        { id: 'trash', label: 'Trash', icon: trash, component: ClearTool},
    ];

    export default toolsConfig;