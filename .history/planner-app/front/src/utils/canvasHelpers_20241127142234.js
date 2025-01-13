

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

export const  drawArea = ( context ,x, y, radius, startAngle, endAngle, rotationAngle, strokeStyle, fillStyle) => {
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
};


export const getSvgTemplate = (type, color) => {
    const templates = {
        destroyer: 
        `<svg id="uuid-0a734424-3953-45f4-bd29-22571a09dc3c" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204.7 132.64">
            <polygon fill="#222221" stroke-width="0px" points="204.7 63.11 0 0 0 132.64 204.7 63.11"/>
        </svg>
        `,
        cruiser: 
        `<svg id="uuid-e9367c4c-95b3-4e39-b056-31b48712996f" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 346.67 154">
            <polygon fill="#222221" stroke-width="0px" class="uuid-92066642-a0e2-4372-8c77-4df0d47e7d85" points="0 153.51 41.79 153.94 135.83 .43 .87 0 0 153.51"/>
            <polygon fill="#222221" stroke-width="0px" class="uuid-92066642-a0e2-4372-8c77-4df0d47e7d85" points="134.37 .36 173.82 .36 79.62 153.94 40.17 153.94 134.37 .36"/>
            <polygon fill="#222221" stroke-width="0px" class="uuid-92066642-a0e2-4372-8c77-4df0d47e7d85" points="252.3 .3 346.67 77.15 252.88 154 158.51 154 252.3 .3"/>
            <polygon fill="#222221" stroke-width="0px" class="uuid-92066642-a0e2-4372-8c77-4df0d47e7d85" points="213.39 .42 252.84 .42 158.64 153.99 119.19 153.99 213.39 .42"/>
        </svg>
        `,
        battleship: 
        `<svg id="uuid-19b12959-7e1d-4b9d-a9c1-62992c23c231" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 346.67 154">
            <polygon fill="#222221" stroke-width="0px" points="0 153.51 41.79 153.94 135.83 .43 .87 0 0 153.51"/>
            <polygon fill="#222221" stroke-width="0px" points="173.48 .36 212.93 .36 118.73 153.94 79.28 153.94 173.48 .36"/>
            <polygon fill="#222221" stroke-width="0px" points="252.3 .3 346.67 77.15 252.88 154 158.51 154 252.3 .3"/>
        </svg>`, 
    };
    return templates[type];
};

export const drawTemporaryIcon = (ctx, { x, y, key, color, label }) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.fillText(label, -10, 30);
    ctx.restore();
};