import  React, {useEffect, useRef, useContext}  from "react";



const IconTool = ({isActive}) =>{ 
   
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects,  dispatch } = useObjects();
    const isPlacing = useRef(false);
    const startX = useRef(null);
    const startY = useRef(null);
    const shipKey = useRef('destroyer');
    const fillColor = useRef('#fff000') 
    useEffect((isActive) => {

    },[isActive, canvasRef, dispatch, 
        objects, drawingCanvasRef, getCanvasContext, 
        getDrawingCanvasContext, clearDrawingCanvas,
    ]);
    return null;
};

export default IconTool;
