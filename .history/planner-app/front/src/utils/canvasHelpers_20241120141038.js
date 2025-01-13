

export const curveEndDrawArrow = (fromX, fromY, toX, toY, angle) => {
    console.log('drawing')
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    const headLength = 20;
    ctx.beginPath();
    ctx.lineWidth = lineWidth.current;
    ctx.strokeStyle = strokeStyle.current;
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - headLength * Math.cos(angle - Math.PI / 6),
        toY - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - headLength * Math.cos(angle + Math.PI / 6),
        toY - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
};


export default curveEnddrawArrow;
