export function createObject(toolType, params) {
    switch (toolType) {
        case "circle":
          return { id: Date.now(), type: "circle", radius: params.radius, color: params.color };
        case "rectangle":
          return { id: Date.now(), type: "rectangle", width: params.width, height: params.height, color: params.color };
        case "text":
          return { id: Date.now(), type: "text", content: params.content, fontSize: params.fontSize, color: params.color };
        default:
          throw new Error(`Unknown tool type: ${toolType}`);
      }
}