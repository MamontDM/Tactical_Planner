


export const getCoordinates = (event, canvas) => {
   
    const scaleX = this.context.canvas.width / positionRect.width;
    const scaleY = this.context.canvas.height / positionRect.height;
    const x = (event.clientX - positionRect.left) * scaleX;
    const y = (event.clientY - positionRect.top) * scaleY;
    return { x , y };
  };
