import  { useEffect, useContext, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { getCoordinates } from '../../../../../utils/commonHelpers';
import CanvasContext from '../../../../contexts/CanvasContext';
import { useObjects } from '../../../../../hooks/useObjects';
import { drawObjects } from '../../../../../factories/CanvasRender';
import { drawTemporaryIcon} from '../../../../../utils/canvasHelpers';
import { getSvgTemplate, convertSvgToImage } from '../../../../../factories/IconSVGCreator';
import { IconDestroyer, IconCruiser, IconBattleship } from '../../../../../assets/exportIcon';



const IconTool = ({isActive, settings}) =>{ 
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects,  dispatch } = useObjects();
    const isPlacing = useRef(false);
    const startX = useRef(null);
    const startY = useRef(null);
    const shipImg = useRef(null);
    const shipType = useRef(null);
    const fillColor = useRef('#fff000');
    const shipLabel = useRef('USS');
    const rotationAngle = useRef(0);
    const [img, setImg] = useState(null);


    const generateImage = () =>{
        const svgString = getSvgTemplate(shipImg.current, fillColor.current);
        convertSvgToImage(svgString, (img) => {
            setImg(img);
        });
     };

    const handleSetShipIcon = (type) => {
        console.log(type);
        if(type){
            shipImg.current = type;
            shipType.current = type;  
        }else {
            console.log('wrong type');
        }
        generateImage();
    };
    
    const handleSetColor = (color) => {
        fillColor.current = color;
        generateImage();
      };
    
      const handleSetLabel = (label) => {
        shipLabel.current = label;
      };

      useEffect(() => {
        if (settings) {
            const shipSettings ={
                setShipIcon: handleSetShipIcon,
                setColor: handleSetColor,
                setLabel: handleSetLabel,
                currentSettings: {
                    shipType: shipType.current,
                    fillColor: fillColor.current,
                    shipLabel: shipLabel.current,
                },
            };
        }
    }, [settings]);


    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current) {
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';
            drawingCtx.canvas.style.cursor = 'crosshair';
            
            const redrawMainCanvas = () => {
                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };
            
            
            const handleMouseDown = (event) => {
                console.log(img)
                if (!img) return;
                console.log('hey')
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
                dispatch({ type: 'ADD_OBJECT', payload: newObject });
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
    },[isActive, canvasRef, dispatch, objects, 
        drawingCanvasRef, getCanvasContext, 
        getDrawingCanvasContext, clearDrawingCanvas, img
    ]);


        return null;
};

export default IconTool;
