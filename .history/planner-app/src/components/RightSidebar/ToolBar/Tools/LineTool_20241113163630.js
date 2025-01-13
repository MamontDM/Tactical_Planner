import React, {  useState, useEffect, useRef, useContext  } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';

const LineTool = ({isActive}) => {

    const [lineWidth, setLineWidth] = useState(2);
    const [strokeStyle, setStrokeStyle] = useState('#ffffff');
    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints] = useState([]);

    const canvasRef  = useContext(CanvasContext);
    const contextRef = useRef(null);


    useEffect(() => {
        if (isActive  && canvasRef.current) {
            activate();
        } else if (!isActive){
            deactivate();
        }
        return () => deactivate();
    }, [isActive, canvasRef.current]);

    const activate = () => {
        if (canvasRef.current) {
            console.log('activated in active();')
            contextRef.current = canvasRef.current.getContext('2d');
            contextRef.current.canvas.style.cursor = 'crosshair';
    
            contextRef.current.canvas.onmousedown = onMouseDown;
            contextRef.current.canvas.onmousemove = onMouseMove;
            contextRef.current.canvas.onmouseup = onMouseUp;
        } else {
            console.warn("canvasRef.current is undefined");
        }
    };
    const deactivate = () => {
        if (contextRef.current) {
            contextRef.current.canvas.onmousedown = null;
            contextRef.current.canvas.onmousemove = null;
            contextRef.current.canvas.onmouseup = null;
            contextRef.current.canvas.style.cursor = 'default';
        }
        setIsDrawing(false);
        setPoints([]);
        };
   

    const onMouseDown = (event) => {
                const { x, y } = getCoordinates(event, canvasRef.current);
                setPoints([{ x, y }]);
                setIsDrawing(true);
        
                contextRef.current.beginPath();
                contextRef.current.lineWidth = lineWidth;
                contextRef.current.strokeStyle = strokeStyle;
                contextRef.current.moveTo(x, y);
            };
        
            const onMouseMove = (event) => {
                if (!isDrawing) return;
        
                const { x, y } = getCoordinates(event, canvasRef.current);
                setPoints(prevPoints => [...prevPoints, { x, y }]);
        
                contextRef.current.lineTo(x, y);
                contextRef.current.stroke();
            };
        
            const onMouseUp = () => {
                if (!isDrawing) return;
        
                setIsDrawing(false);
                contextRef.current.closePath();
        
                const object = {
                    points: points,
                    type: 'line',
                    options: {
                        lineWidth: lineWidth,
                        strokeStyle: strokeStyle
                    }
                };
                console.log(object);
                setPoints([]);
            };

};
export default LineTool;