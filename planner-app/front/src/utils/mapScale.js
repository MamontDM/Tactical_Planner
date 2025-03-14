
export function pixelsToKilometers(x, y, mapSize,  imageWidth = 1200, imageHeight = 1200) {

    const scaleX = mapSize/ imageWidth;
    const scaleY = mapSize / imageHeight;

    return {
        xKm: x * scaleX,
        yKm: y * scaleY
    };
}


export function kmToPixels( km, mapSize,  imageWidth = 1200, imageHeight = 1200) {
    
    const scale = mapSize / Math.max(imageWidth, imageHeight);

    return km / scale;
}


