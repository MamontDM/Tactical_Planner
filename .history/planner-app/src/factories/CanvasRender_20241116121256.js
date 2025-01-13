import React, {useContext, useEffect} from 'react';
import { ObjectContext } from '../components/contexts/ObjectContext';
import CanvasContext from '../components/contexts/CanvasContext';

const CanvasRenderer = () =>  {
    const canvasRef = useContext(CanvasContext);
    const { objects } = useContext(ObjectContext);

    useEffect(() => {
        console.log('componen called')
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        const scale = window.devicePixelRatio;

        context.clearRect(0, 0, canvas.width, canvas.height);

        const drawObject = (object) => {
            switch (object.type){
                case 'line': 
                    context.beginPath();
                    context.lineWidth = object.lineWidth * scale;
                    context.strokeStyle = object.color;
                    object.points.forEach((point, index) => {
                        if (index === 0){
                            context.moveTo(point.x * scale, point.y * scale);
                        }else{
                            context.lineTo(point.x * scale, point.y * scale);
                        }
                    });
                    context.stroke();
                    context.closePath();
                    break;
            }
        };

        objects.forEach((object) => drawObject(object));
    }, [objects]);
    return <canvas ref={canvasRef}></canvas>;
};

export default CanvasRenderer;