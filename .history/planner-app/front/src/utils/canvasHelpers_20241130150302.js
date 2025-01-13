

export const drawSmoothCurve = (temporaryPoints, points, lineWidth, strokeStyle, ctx) => {
        if (points.length < 1) return;
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

// export const  drawArea = ( context ,x, y, radius, startAngle, endAngle, rotationAngle, strokeStyle, fillStyle) => {
//     console.log("Coordinates:", x, y);
// console.log("Canvas size:", context.canvas.width, context.canvas.height);
//     context.save();
//     context.translate(x, y);  
//     context.rotate(rotationAngle); 
//     context.beginPath();
//     context.moveTo(0, 0);
//     context.arc(0, 0, radius, startAngle, endAngle); 
//     context.lineTo(0, 0); 
//     context.fillStyle = fillStyle;
//     context.fill();
//     context.strokeStyle = strokeStyle;
//     context.stroke();
//     context.restore();
// };

export const drawArea = (context, x, y, radius, startAngle, endAngle, rotationAngle, strokeStyle, fillStyle) => {
    console.log("Drawing area with parameters:", { x, y, radius, startAngle, endAngle, rotationAngle, strokeStyle, fillStyle });
  
    // Проверяем параметры
    if (!context || !context.arc) {
      console.error("Invalid context provided");
      return;
    }
    if (radius <= 0) {
      console.error("Radius must be greater than 0");
      return;
    }
  
    context.save();
    context.translate(x, y);
    context.rotate(rotationAngle);
    context.beginPath();
    context.moveTo(0, 0);
    context.arc(0, 0, radius, startAngle, endAngle);
    context.lineTo(0, 0);
    context.fillStyle = fillStyle;
    context.fill();
    context.strokeStyle = strokeStyle;
    context.stroke();
    context.restore();
  
    console.log("Drawing completed successfully.");
  };
  



export const drawTemporaryIcon = (context,  x, y, img, angle, color, label ) => {
    context.save();
    context.translate(x, y);
    console.log(x ,y);
    context.rotate(angle);
    const iconWidth = 40;
    const iconHeight = 18;
    context.drawImage(img, -iconWidth/2, -iconHeight/2, iconWidth, iconHeight);
    context.rotate(-angle);
    context.fillStyle = color;
    context.font = 'italic bold 14px Verdana';
    context.fillText(label, -20, -35);
    context.restore();
};