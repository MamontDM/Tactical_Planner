import React, {useContext, useEffect} from 'react';
import { ObjectContext } from '../components/contexts/ObjectContext';
import CanvasContext from '../components/contexts/CanvasContext';

const CanvasRenderer = () =>  {
    const { canvasRef } = useContext(CanvasContext);
    const { objects } = useContext(ObjectContext);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        const scale = window.devicePixelRatio;

        context.clearRect(0, 0, canvas.width, canvas.height);

        const drawObject = (object) => {
            console.log('componen called')
            switch (object.type){
                case 'line': 
                    context.beginPath();
                    context.lineWidth = object.lineWidth * scale;
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
                    default:
                        console.log('default case');
                        break;
            }
        };

        objects.forEach((object) => drawObject(object));
    }, [canvasRef, objects]);
    
    return null;
};

export default CanvasRenderer;