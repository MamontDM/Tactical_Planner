import  { useEffect, useContext, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { drawObjects } from '../../../../factories/CanvasRender';
import { drawTemporaryIcon} from '../../../../utils/canvasHelpers';
import { getSvgTemplate, convertSvgToImage } from '../../../../factories/IconSVGCreator';
import { IconDestroyer, IconCruiser, IconBattleship } from '../../../../assets/exportIcon';



const IconTool = ({isActive}) =>{ 
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects,  dispatch } = useObjects();
    const rightSidebar = document.getElementById('rightSidebar');
    const isPlacing = useRef(false);
    const startX = useRef(null);
    const startY = useRef(null);
    const shipImg = useRef(null);
    const fillColor = useRef('#fff000');
    const shipLabel = useRef('USS');
    const rotationAngle = useRef(0);
    const [imgUrl, setImgUrl] = useState(null);


    const generateImage = () =>{
        const svgString = getSvgTemplate(shipImg.current, fillColor.current);
        convertSvgToImage(svgString, (img) => {
            setImgUrl(img.src);
        });
     };

    const handleSetShipIcon = (type) => {
        console.log(type);
        if(type){
            shipImg.current = type;  
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
        console.log('done')
        if (isActive && canvasRef?.current && drawingCanvasRef?.current) {
            console.log('done 2')
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
                if (!imgUrl) return;
                isPlacing.current = true;
                const {x , y} = getCoordinates(event, drawingCanvas);
                startX.current = x;
                startY.current = y;
                console.log(imgUrl);
                drawTemporaryIcon(drawingCtx,  x, y, imgUrl, rotationAngle.current, fillColor.current,  shipLabel.current );
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
                    imgUrl, 
                    rotationAngle.current, 
                    fillColor.current,  
                    shipLabel.current 
                );
            };

            const handleMouseUp = (event) => {
                if (!isPlacing.current) return;
                const { x, y } = getCoordinates(event, drawingCanvas);

                const newObject = {
                    id: Date.now(),
                    type: 'icon',
                    x: startX,
                    y: startY,
                    rotation: rotationAngle.current,
                    img: imgUrl,
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
        getDrawingCanvasContext, clearDrawingCanvas, imgUrl
    ]);


    if (!isActive || !rightSidebar) {
        return null;
      }
        return ReactDOM.createPortal(
            <div className="tool-settings">
                <label>
                    <h3>Select ship type:</h3>
                </label>
                <ul className="ship-icon-list">
                    <button className="ship-button" onClick={() => handleSetShipIcon('destroyer')}>
                   <img className="ship-icon" src={IconDestroyer} alt="error" />
                    </button>
                    <button className="ship-button" onClick={() => handleSetShipIcon('cruiser')}>
                          <img className="ship-icon" src={IconCruiser} alt="error" />
                    </button>
                    <button className="ship-button" onClick={() => handleSetShipIcon('battleship')}>
                          <img className="ship-icon" src={IconBattleship} alt="error" />
                    </button>
                </ul>
                <h3>Set Color:</h3>
                    <input type="color" onChange={(e) => handleSetColor(e.target.value)} defaultValue="#ffffff" />
                <h3>Set Label:</h3>
                    <input type="text" onChange={(e) => handleSetLabel(e.target.value)} defaultValue="USS" />
                </div>,
            rightSidebar
    );
};

export default IconTool;
