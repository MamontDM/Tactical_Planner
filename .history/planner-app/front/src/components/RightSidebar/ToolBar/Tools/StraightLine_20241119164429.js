    import React, {useEffect, useContext, useRef} from 'react';
    import CanvasContext from '../../../contexts/CanvasContext';
    import { useObjects} from '../../../../hooks/useObjects';
    import { getCoordinates } from '../../../../utils/commonHelpers';
    import { drawObjects } from '../../../../factories/CanvasRender' 





const StraightTool = ({isActive}) => {
    const { canvasRef } = useContext(CanvasContext);
    const contextRef = useRef(null);
    const { objects, dispatch} = useObjects();


    useEffect(() =>{
        if(isActive && canvasRef?.current){
            contextRef.current = canvasRef.current.getContext('2d');
            contextRef.current.lineWidth = 2;
            contextRef.current.strokeStyle = '#fff234';
            contextRef.current.canvas.style.cursor = 'crosshair';
                        
            const handleMouseDown = (event) => { 
                isDrawing.current = true;
                pointRef.current = {points: []};
                const { x , y} = getCoordinates(event, canvasRef.current);
                pointRef.current.points[0] = { x , y};
            };

            const handleMouseMove = (event) =>{
                if(!isDrawing.current) return;
               
                const canvas = canvasRef.current;
                drawObjects(canvas, objects);
                const { x, y} = getCoordinates(event, canvasRef.current);
                const ctx = canvasRef.current.getContext("2d");

                const start = pointRef.current.points[0];
                ctx.beginPath();
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(x , y);
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 2;
                ctx.stroke();
            };

            const handleMouseUp = (event) => {
                if (!isDrawing.current) return;
                isDrawing.current = false;
        
                const { x, y } = getCoordinates(event, canvasRef.current);
                const start = pointRef.current.points[0];
                pointRef.current.points[1] = { x, y };

                const ctx = canvasRef.current.getContext("2d");
                ctx.beginPath();
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(x, y);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 2;
                ctx.stroke()
               
               
                // dispatch({
                //     type: "ADD_OBJECT",
                //     payload: {
                //         type: "line",
                //         points: [...pointRef.current.points],
                //     },
                // });
        
                // tempCtx.clearRect(0, 0, tempCanvasRef.current.width, tempCanvasRef.current.height);
            };
    
    return null;
}

