import React, {useContext, useEffect} from 'react';
import { ObjectContext } from '../components/contexts/ObjectContext';
import CanvasContext from '../components/contexts/CanvasContext';
import { curveEndDrawArrow , drawSmoothCurve } from '../utils/canvasHelpers';


export const drawObject = (canvas, object) => {
    console.log(object);
    if(!canvas || !object){
        console.error('Canvas or object is missing');
        return;
    }
    const context = canvas.getContext('2d');
    if(!context){
        console.error('Failed to get canvas');
        return;
    }
    switch (object.type){
        case 'line': 
        case 'tech':
            context.beginPath();
            context.lineWidth = object.lineWidth;
            context.strokeStyle = object.color;
            object.points.forEach((point, index) => {
                if (index === 0){
                    context.moveTo(point.x, point.y);
                }else{
                    context.lineTo(point.x, point.y);
                }
            });
            context.stroke();
            context.closePath();
            break;
        case 'curve': 
            
            context.lineWidth = object.lineWidth;
            context.strokeStyle = object.color;
            context.drawingCtx  = context;
            const temporaryPoints = object.temporaryPoints;
            const points = object.points;

            drawSmoothCurve(temporaryPoints, points, context.lineWidth, context.strokeStyle, context.drawingCtx);
           
            if (object.arrow) {
                curveEndDrawArrow(
                    context,
                    object.arrow.fromX,
                    object.arrow.fromY,
                    object.arrow.toX,
                    object.arrow.toY,
                    object.arrow.angle,
                    object.arrow.headLength,
                    object.color,
                    object.linewidth,
                );
            }
            break;
            default:
                console.log('default case');
                break;
    }
};

export const drawObjects = (canvas, objects) =>{
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    objects.forEach((object) => drawObject(canvas, object));
};


const CanvasRenderer = () =>  {
    const { canvasRef } = useContext(CanvasContext);
    const { objects } = useContext(ObjectContext);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
       
        drawObjects(canvas, objects);
    }, [canvasRef, objects]);
    
    return null;
};

export default CanvasRenderer;