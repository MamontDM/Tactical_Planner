
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

export function createObject(toolType, params) {
  switch (toolType) {
      case "circle":
        return { type: "circle", radius: params.radius, color: params.color };
      case "rectangle":
        return { type: "rectangle", width: params.width, height: params.height, color: params.color };
      case "text":
        return { type: "text", content: params.content, fontSize: params.fontSize, color: params.color };
      default:
        throw new Error(`Unknown tool type: ${toolType}`);
    }
}