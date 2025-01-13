

export const getCoordinates = (event, canvas) => {
  if (!canvas) {
      console.warn('Canvas элемент не найден');
      return { x: 0, y: 0 };
  }
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * (canvas.width / rect.width);
  const y = (event.clientY - rect.top) * (canvas.height / rect.height);

  return { x, y };
};


export function findClickedObject(clickX, clickY, objects) {
    console.log(objects);
  for (const object of objects) {
    switch (object.type){
          case "line":
            case "tech":
              case "curve":
              for (let i = 0; i < object.points.length - 1; i++) {
                  const point1 = object.points[i];
                  const point2 = object.points[i + 1];
                  if (isPointNearLineSegment(clickX, clickY, point1, point2)) {
                      return object;
                  }
              }
          break;
          case "radar": 
            if(isPointOnCircle(object, clickX, clickY)){
                return object;
            }
            break;
            case "vision": 
             if(isPointInSector(object, clickX, clickY)){
              return object;
             }
             break;
             case "icon":
              case "text":
              const tolerance = 15;
                if(isPointOnIconOrText(object, clickX, clickY, tolerance)){
                  return object;
                };
            break;
            default: console.log('default object')
          break;
      }
  }

  function isPointOnIconOrText(object, clickX, clickY, tolerance){

    const centerX = object.x;
      const centerY = object.y;
      const distance = Math.sqrt((clickX - centerX) ** 2 + (clickY - centerY) **2);
      return distance <= tolerance;
    
  }
  
    function isPointOnCircle(object, x, y, tolerance = 5) {
        if (object.type !== 'radar' || !object.radius || !object.points || object.points.length === 0) {
      return false;
    }
      const centerX = object.points[0].x;
      const centerY = object.points[0].y;
      const radius = object.radius;
      
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      return Math.abs(distance - radius) <= tolerance;
    }


  function isPointNearLineSegment(x, y, point1, point2, tolerance = 5) {
      const A = x - point1.x;
      const B = y - point1.y;
      const C = point2.x - point1.x;
      const D = point2.y - point1.y;

      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      const param = lenSq !== 0 ? dot / lenSq : -1;

      let nearestX, nearestY;
      if (param < 0) {
          nearestX = point1.x;
          nearestY = point1.y;
      } else if (param > 1) {
          nearestX = point2.x;
          nearestY = point2.y;
      } else {
          nearestX = point1.x + param * C;
          nearestY = point1.y + param * D;
      }

      const dist = Math.sqrt((x - nearestX) ** 2 + (y - nearestY) ** 2);
      return dist <= tolerance;
  }

  function isPointInSector(object, clickX, clickY) {
    const centerX = object.x;
    const centerY = object.y;
    const radius = object.radius;
    const distance = Math.sqrt((clickX - centerX) ** 2 + (clickY - centerY) ** 2);
    if (distance > radius) {
        return false; 
    }
    const angle = Math.atan2(clickY - centerY, clickX - centerX);
    let normalizedAngle = angle;
    normalizedAngle = (normalizedAngle - object.rotationAngle) % (2 * Math.PI);
    if (normalizedAngle < 0) {
        normalizedAngle += 2 * Math.PI;
    }
    const startAngle = object.startAngle;
    const endAngle = object.endAngle;
  
    if (normalizedAngle >= startAngle && normalizedAngle <= endAngle) {
      console.log('kuku');
        return true; 
    }
    return false;
  }
}