import  { useEffect, useContext, useRef, useState } from 'react';
import { getCoordinates } from '../../../../../utils/commonHelpers';
import CanvasContext from '../../../../contexts/CanvasContext';
import { drawObjects } from '../../../../../factories/CanvasRender';
import { drawTemporaryIcon} from '../../../../../utils/canvasHelpers';
import { getSvgTemplate, convertSvgToImage } from '../../../../../factories/IconSVGCreator';
import { useToolSettings} from '@/store/zustand/Toolbar/toolsettingStore';
import { useMapStore } from '@/store/zustand/MapStore/mapStore';

const IconTool = ({isActive, type}) =>{ 
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    
    const addObject = useMapStore((state) => state.addObject);
    const settings = useToolSettings((state) => state.getSettings(type));
    const currentObjects = useMapStore((state) => state.getCurrentObjects());

    const shipType = useRef(null);
    const fillColor = useRef(null);
    const shipLabel = useRef(null);

    const rotationAngle = useRef(0);
    const [img, setImg] = useState(null);
    const isPlacing = useRef(false);
    const startX = useRef(null);
    const startY = useRef(null);
    

    const settingUpdater = (data) => {
        setsettings(data); 
    }; 

    useEffect(() =>{
        if(settings){
            console.log(settings);
            shipType.current = settings.shipType;
            fillColor.current = settings.color;
            shipLabel.current = settings.label;
        }
        generateImage();
    },[settings])


    const generateImage = () =>{
        const svgString = getSvgTemplate(shipType.current, fillColor.current);
        convertSvgToImage(svgString, (img) => {
            setImg(img);
        });
     };
  

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current && settings) {
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';
            drawingCtx.canvas.style.cursor = 'crosshair';

            const redrawMainCanvas = () => {
                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, currentObjects);
            };
            
            
            const handleMouseDown = (event) => {
                if (!img) return;
                isPlacing.current = true;
                const {x , y} = getCoordinates(event, drawingCanvas);
                startX.current = x;
                startY.current = y;
                drawTemporaryIcon(drawingCtx,  x, y, img, rotationAngle.current, fillColor.current,  shipLabel.current );
            };

            const handleMouseMove = (event) => {

                if (!isPlacing.current) return;
                const { x, y } = getCoordinates(event, drawingCanvas);
                rotationAngle.current = Math.atan2(y - startY.current, x - startX.current);
                clearDrawingCanvas();
                redrawMainCanvas();

                drawTemporaryIcon(
                    drawingCtx,  
                    startX.current, 
                    startY.current, 
                    img, 
                    rotationAngle.current, 
                    fillColor.current,  
                    shipLabel.current 
                );
            };

            const handleMouseUp = (event) => {
                if (!isPlacing.current) return;

                const newObject = {
                    id: Date.now(),
                    type: 'icon',
                    x: startX.current,
                    y: startY.current,
                    rotation: rotationAngle.current,
                    img: img,
                    color: fillColor.current,
                    label: shipLabel.current,
                };
                addObject(newObject);
                isPlacing.current = false;
                clearDrawingCanvas();
                redrawMainCanvas();
            };
            
            drawingCanvas.addEventListener("mousedown", handleMouseDown);
            drawingCanvas.addEventListener("mousemove", handleMouseMove);
            drawingCanvas.addEventListener("mouseup", handleMouseUp);

            return () => {
                if(drawingCanvas){
                drawingCanvas.removeEventListener("mousedown", handleMouseDown);
                drawingCanvas.removeEventListener("mousemove", handleMouseMove);
                drawingCanvas.removeEventListener("mouseup", handleMouseUp);
                }
                drawingCanvas.style.cursor = "default";
                drawingCanvas.style.pointerEvents = "none";
            };
        }
    },[isActive, canvasRef, drawingCanvasRef, getCanvasContext,currentObjects, 
        getDrawingCanvasContext, clearDrawingCanvas, img,
    ]);


};

export default IconTool;
