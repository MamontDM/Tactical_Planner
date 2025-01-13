import { useContext } from 'react'
import CanvasContext from '../../../contexts/CanvasContext';

const DownLoadTool = ({onDeactivate, isAcivate}) => {
    const { canvasRef, backgroundCanvasRef, drawingCanvasRef } = useContext(CanvasContext);


    const mergeCanvases = (canvasRef, backgroundCanvasRef, drawingCanvasRef, fileName) => {
        const temporaryCanvas = 
    }
};

export default DownLoadTool;