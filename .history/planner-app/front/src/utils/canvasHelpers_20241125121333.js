

export const drawSmoothCurve = (temporaryPoints, points, lineWidth, strokeStyle, ctx) => {
    console.log(ctx)
    if (points.length < 1) return;
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    const lastPoint = points[points.length - 1];
    if (temporaryPoints && temporaryPoints.length > 0) {
        const endX = temporaryPoints[temporaryPoints.length - 1].x;
        const endY = temporaryPoints[temporaryPoints.length - 1].y;
        ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, endX, endY);
    } else {
        ctx.lineTo(lastPoint.x, lastPoint.y);
    }
    ctx.stroke();
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