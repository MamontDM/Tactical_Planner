
export const drawCurveFromPoints = (smoothPoints, lineWidth, strokeStyle, ctx) => {
    if (smoothPoints.length < 2) return;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;

    ctx.beginPath();
    ctx.moveTo(smoothPoints[0].x, smoothPoints[0].y);

    for (let i = 1; i < smoothPoints.length; i++) {
        ctx.lineTo(smoothPoints[i].x, smoothPoints[i].y);
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