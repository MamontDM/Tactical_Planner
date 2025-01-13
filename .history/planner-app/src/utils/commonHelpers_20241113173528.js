
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

  