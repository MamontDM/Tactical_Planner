import { useContext,useEffect, useState} from 'react';
import CanvasContext from '../../../../contexts/CanvasContext';
import { useObjects } from '../../../../../hooks/useObjects';
import { drawObjects } from '../../../../../factories/CanvasRender';
import { getCoordinates } from '../../../../../utils/commonHelpers';
import { drawingText } from '../../../../../utils/canvasHelpers';
import ToolSettings from '../../ToolSettings/toolSettings';


const TextTool = ({isActive, type}) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects, dispatch} = useObjects();
    const [currentSetting, setCurrentSetting] = useState();

    const settingUpdater = (data) => {
        console.log(data);
        setCurrentSetting(data); 
    }; 

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current && currentSetting) {
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';
            drawingCtx.canvas.style.cursor = 'crosshair';
            const textBody = currentSetting.textBody;
            const fontSize = currentSetting.fontSize;
            const textColor = currentSetting.color;
            
            const redrawMainCanvas = () => {
                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };


const handleClick = (event) => {
    const {x , y} = getCoordinates(event, drawingCanvas);
    const textWidth = drawingText(
        drawingCtx, 
        currentSetting.textBody, 
        x, 
        y,
        currentSetting.fontSize,
        currentSetting.color
);

const newObject = { 
        id: Date.now(),
        type: 'text',
        textBody: textBody,
        x: x,
        y: y,
        width: textWidth,
        fontSize: fontSize,
        textColor: textColor,
    };
    console.log(newObject);
    dispatch({ type: 'ADD_OBJECT', payload: newObject });
    clearDrawingCanvas();
    redrawMainCanvas();
};
            
            drawingCanvas.addEventListener("click", handleClick);

            return () => {
                if(drawingCanvas){
                drawingCanvas.removeEventListener("click", handleClick);
                }
                drawingCanvas.style.cursor = "default";
                drawingCanvas.style.pointerEvents = "none";
            };
        }
    }, [ isActive, canvasRef, dispatch, objects, 
        drawingCanvasRef, getCanvasContext, 
        getDrawingCanvasContext, currentSetting, clearDrawingCanvas]);
 return (
    <ToolSettings type={type} onSettingChange={settingUpdater} />
 )
};


export default TextTool;