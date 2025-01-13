import React, { useEffect, useContext } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { findClickedObject } from '../../../../utils/commonHelpers';
import CanvasRenderer from '../../../../factories/CanvasRender';

const MoveTool = ({isActive}) => {
    const {canvasRef} = useContext(CanvasContext);
    const { objects } = useObjects();

    useEffect(() =>{
        if(isActive && canvasRef.current){
           const handleMouseDown = (event) => {
           const { x, y } = getCoordinates(event, canvasRef.current);
           console.log(objects);
           const clickedObject = findClickedObject(x, y, objects);
           
           if (clickedObject) {
               console.log(Object)
           }else{
               console.log('Клик не попал в обьект');
           }
       };

       canvasRef.current.addEventListener('mousedown', handleMouseDown);
       return () => {
           canvasRef.current.removeEventListener('mousedown', handleMouseDown);
       };
   }
}, [isActive, objects, canvasRef]);

   return  null;
};

export default MoveTool;