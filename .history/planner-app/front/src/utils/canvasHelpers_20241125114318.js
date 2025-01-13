

export const drawSmoothCurve = (temporaryPoints, points, lineWidth, strokeStyle, ctx) => {
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

    if (temporaryPoints.length > 0) {
        const lastPoint = points[points.length - 1];
        ctx.moveTo(lastPoint.x, lastPoint.y);


        for (let i = 0; i < temporaryPoints.length - 1; i++) {
            const xc = (temporaryPoints[i].x + temporaryPoints[i + 1].x) / 2;
            const yc = (temporaryPoints[i].y + temporaryPoints[i + 1].y) / 2;
            ctx.quadraticCurveTo(temporaryPoints[i].x, temporaryPoints[i].y, xc, yc);
        }

  
        // const lastTemporaryPoint = temporaryPoints[temporaryPoints.length - 1];
        // ctx.lineTo(lastTemporaryPoint.x, lastTemporaryPoint.y);
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