import  React, {useEffect, useRef, useContext}  from "react";



const IconTool = ({isActive}) =>{ 
   
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects,  dispatch } = useObjects();
    const radius = useRef(250);
    const points = useRef([]);
    const lineWidth = 2;
    const strokeStyle = "#fff234";

    useEffect((isActive) => {

    },[isActive, canvasRef, dispatch, 
        objects, drawingCanvasRef, getCanvasContext, 
        getDrawingCanvasContext, clearDrawingCanvas,
    ]);
    return null;
};

export default IconTool;
