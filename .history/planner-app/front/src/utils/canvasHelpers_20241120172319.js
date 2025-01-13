


const drawSmoothCurve = (temporaryPoint, points, lineWidth, strokeStyle, virtualCtx) => {
    if (!canvasRef.current || points.length < 1) return;
    
    virtualCtx.lineWidth = lineWidth;
    virtualCtx.strokeStyle = strokeStyle;
    virtualCtx.beginPath();
    virtualCtx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        virtualCtx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }

    const lastPoint = points[points.length - 1];
    const endX = temporaryPoint ? temporaryPoint.x : lastPoint.x;
    const endY = temporaryPoint ? temporaryPoint.y : lastPoint.y;
    virtualCtx.quadraticCurveTo(lastPoint.x, lastPoint.y, endX, endY);
    virtualCtx.stroke();
};



export const curveEndDrawArrow = (ctx, fromX, fromY, toX, toY, angle, headLength, lineWidth, strokeStyle) => {
    if (!ctx) return;
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
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
    ctx.restore();
};