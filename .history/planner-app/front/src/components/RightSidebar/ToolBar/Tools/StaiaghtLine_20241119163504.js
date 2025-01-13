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

                

            }
        }
    })


}

