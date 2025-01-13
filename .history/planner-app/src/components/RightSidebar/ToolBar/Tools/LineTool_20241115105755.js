import React, {  useState, useEffect, useRef, useContext  } from 'react';
import { getCoordinates, createObject } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';


const LineTool = ({isActive}) => {

    const { canvasRef } = useContext(CanvasContext); 
    const contextRef = useRef(null);
    const isDrawing = useRef(false);

    useEffect(() => {
        if (isActive && canvasRef.current) {
            contextRef.current = canvasRef.current.getContext('2d');
            contextRef.current.lineWidth = 2;
            contextRef.current.strokeStyle = '#fff234';
            contextRef.current.canvas.style.cursor = 'crosshair';

            const handleMouseDown = (event) => {
                isDrawing.current = true;
                const { x, y } = getCoordinates(event, canvasRef.current);
                contextRef.current.beginPath();
                contextRef.current.moveTo(x , y);
                
            };

            const handleMouseMove = (event) => {
                if (!isDrawing.current) return;
                const { x, y } = getCoordinates(event, canvasRef.current);
                contextRef.current.lineTo(x , y);
                contextRef.current.stroke();
            };

            const handleMouseUp = () => {
                if (isDrawing.current) {
                    isDrawing.current = false;
                    contextRef.current.closePath();
                }
            };

            canvasRef.current.addEventListener('mousedown', handleMouseDown);
            canvasRef.current.addEventListener('mousemove', handleMouseMove);
            canvasRef.current.addEventListener('mouseup', handleMouseUp);

            return () => {
                canvasRef.current.removeEventListener('mousedown', handleMouseDown);
                canvasRef.current.removeEventListener('mousemove', handleMouseMove);
                canvasRef.current.removeEventListener('mouseup', handleMouseUp);
                contextRef.current.canvas.style.cursor = 'default';
            };
        }
    }, [isActive, canvasRef]);



    return null;
};
export default LineTool;