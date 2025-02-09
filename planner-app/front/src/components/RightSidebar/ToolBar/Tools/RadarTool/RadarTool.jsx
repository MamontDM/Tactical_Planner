import { useEffect, useContext, useRef, useState } from 'react';
import { getCoordinates } from '../../../../../utils/commonHelpers';
import { drawCircle } from '../../../../../utils/canvasHelpers';
import CanvasContext from '../../../../contexts/CanvasContext';
import { useObjects } from '../../../../../hooks/useObjects';
import ToolSettings from '../../ToolSettings/toolSettings';


const RadarTool = ({isActive, type}) => {
    console.log('called Radar tool!')
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects,  dispatch } = useObjects();
    const [ currentSetting, setCurrentSetting ] = useState();
    const scale = useRef(20);
    const points = useRef([]);
    const radius = useRef(null)

    const settingUpdater = (data) => {
        setCurrentSetting(data); 
    }; 
    const radiusCalculation = () => {
        if(currentSetting.range){
            radius.current = currentSetting.range * scale.current;
        }
    }

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current && currentSetting) {
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';
            drawingCtx.lineWidth = currentSetting.lineWidth;
            drawingCtx.strokeStyle = currentSetting.color;
            drawingCtx.canvas.style.cursor = 'crosshair';

            const handleMouseDown = (event) => {
                radiusCalculation();
                    const {x , y} = getCoordinates(event, drawingCanvas);
                    points.current.push({x , y});
                    drawCircle(drawingCtx, x, y, radius.current, currentSetting.lineWidth, currentSetting.color);
                    const newObject = {
                        id: Date.now(),
                        type: "radar",
                        points: [...points.current],
                        radius: radius.current,
                        color: currentSetting.color,
                        lineWidth: currentSetting.lineWidth,
                    };
                    dispatch({ type: "ADD_OBJECT", payload: newObject });
                    points.current = [];
                    clearDrawingCanvas();
                }


        drawingCanvas.addEventListener("mousedown", handleMouseDown);

            return () => {
                drawingCanvas.removeEventListener("mousedown", handleMouseDown);
                drawingCanvas.style.cursor = "default";
                drawingCanvas.style.pointerEvents = "none";
            }
        }
    }, [isActive, canvasRef, dispatch, 
        objects, drawingCanvasRef, getCanvasContext, 
        getDrawingCanvasContext, clearDrawingCanvas, currentSetting
    ]);

   
    return (
        <ToolSettings type={type} onSettingChange={settingUpdater} />
    );
};


export default RadarTool;