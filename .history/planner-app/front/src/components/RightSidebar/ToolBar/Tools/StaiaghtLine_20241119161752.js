    import React, {useEffect, useContext} from 'react';
    import CanvasContext from '../../../contexts/CanvasContext';
    import { useObjects} from '../../../../hooks/useObjects';
    import { getCoordinates } from '../../../../utils/commonHelpers';





const StraightTool = ({isActive}) => {
    const { canvasRef} = useContext(CanvasContext);
    const { objects, dispatch} = useObjects();

    useEffect(() =>{
        if(isActive && canvasRef?.current){
            let isDragging = false;
            
            const drawingStarightLane = (event) => {
                const
            } 
        }
    })


}

