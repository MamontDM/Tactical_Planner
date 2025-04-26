/**
 * Объединяет массив канвасов в один и возвращает итоговый canvas.
 * @param   {HTMLCanvasElement[]} canvases - канвасы в порядке наложения
 * @param   {number} width - ширина результирующего канваса
 * @param   {number} height - высота результирующего канваса
 * @returns {HTMLCanvasElement}
 */
export const mergeCanvases = (canvases, width = 1200, height = 1200) => {
    const resultCanvas = document.createElement('canvas');
    resultCanvas.width = width;
    resultCanvas.height = height;
    const ctx = resultCanvas.getContext('2d');

    canvases.forEach(canvas => {
        if (canvas) ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width, height);
    });

    return resultCanvas;
};


/**
 * Скачивает канвас как файл PNG.
 * @param {string} fileName - имя файла
 * @param {HTMLCanvasElement} canvas - канвас
 */

export const downloadCanvasAsImage = (fileName, canvas) => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = fileName;
    link.click();
};

