
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
  for (const object of objects) {
          case "line":
              for (let i = 0; i < object.points.length - 1; i++) {
                  const point1 = object.points[i];
                  const point2 = object.points[i + 1];
                  if (isPointNearLineSegment(clickX, clickY, point1, point2)) {
                      return object;
                  }
              }
          break;
          default:
              break;
      }
      return null; 
  };






