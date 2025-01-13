const MoveTool = ({ isActive }) => {
    const { canvasRef } = useContext(CanvasContext);
    const { objects, dispatch } = useObjects();

    useEffect(() => {
        if (isActive && canvasRef?.current) {
            let isDragging = false;
            let offsetX = 0;
            let offsetY = 0;
            let selectedObject = null;

            const handleMouseDown = (event) => {
                const { x, y } = getCoordinates(event, canvasRef.current);
                selectedObject = objects.find(
                    (obj) =>
                        x >= obj.x && x <= obj.x + obj.width &&
                        y >= obj.y && y <= obj.y + obj.height
                );

                if (selectedObject) {
                    isDragging = true;
                    offsetX = x - selectedObject.x;
                    offsetY = y - selectedObject.y;
                }
            };

            const handleMouseMove = (event) => {
                if (isDragging && selectedObject) {
                    const { x, y } = getCoordinates(event, canvasRef.current);

                    // Прямая манипуляция с объектом
                    selectedObject.x = x - offsetX;
                    selectedObject.y = y - offsetY;

                    // Перерисовка канваса
                    const canvas = canvasRef.current;
                    const context = canvas.getContext('2d');
                    clearCanvas(canvasRef);
                    objects.forEach((obj) => drawObject(context, obj));
                }
            };

            const handleMouseUp = () => {
                if (isDragging && selectedObject) {
                    // Сохранение изменений в контексте
                    dispatch({
                        type: 'UPDATE_OBJECT',
                        payload: {
                            id: selectedObject.id,
                            updates: {
                                x: selectedObject.x,
                                y: selectedObject.y,
                            },
                        },
                    });
                }
                isDragging = false;
                selectedObject = null;
            };

            canvasRef.current.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                canvasRef.current.removeEventListener('mousedown', handleMouseDown);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isActive, objects, canvasRef, dispatch]);

    return null;
};

export default MoveTool;
