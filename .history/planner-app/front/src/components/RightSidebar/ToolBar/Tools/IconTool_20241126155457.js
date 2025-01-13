import  React, {useEffect, useRef, useContext}  from "react";



const IconTool = ({isActive}) =>{ 
   
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects,  dispatch } = useObjects();
    const isPlacing = useRef(false);
    let startX = useRef(null);
    let startY = useRef(null);

    useEffect((isActive) => {

    },[isActive, canvasRef, dispatch, 
        objects, drawingCanvasRef, getCanvasContext, 
        getDrawingCanvasContext, clearDrawingCanvas,
    ]);
    return null;
};

export default IconTool;
