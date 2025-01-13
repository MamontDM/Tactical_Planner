export const getSvgTemplate = (type, color) => {
    const templates = {
        Destroyer: 
        `<svg id="uuid-0a734424-3953-45f4-bd29-22571a09dc3c" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204.7 132.64">
            <polygon fill="${color}" stroke-width="0px" points="204.7 63.11 0 0 0 132.64 204.7 63.11"/>
        </svg>
        `,
        Cruiser:
            `<svg id="uuid-9807c151-86f7-4689-abee-aecc1c73db6b" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 335.5 155">
                    <polygon fill="${color}" class="uuid-d15842ec-0213-4902-9dab-669588492087" points="161.05 .9 1.33 .5 .5 154.5 74.08 154.5 161.05 .9"/>
                </svg>`,
        Battleship: 
        `<svg id="uuid-19b12959-7e1d-4b9d-a9c1-62992c23c231" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 346.67 154">
            <polygon fill="${color}" stroke-width="0px" points="0 153.51 41.79 153.94 135.83 .43 .87 0 0 153.51"/>
            <polygon fill="${color}" stroke-width="0px" points="173.48 .36 212.93 .36 118.73 153.94 79.28 153.94 173.48 .36"/>
            <polygon fill="${color}" stroke-width="0px" points="252.3 .3 346.67 77.15 252.88 154 158.51 154 252.3 .3"/>
        </svg>`, 
        SuperShip: 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" >
            <polygon 
                points="50,5 61.8,35.36 95.1,35.36 67.55,55.64 79.4,85.0 50,68.2 20.6,85.0 32.45,55.64 4.9,35.36 38.2,35.36"
                fill="${color}" 
                stroke="black" 
                stroke-width="2"
        />
        </svg>`,
    };
    return templates[type];
};

export const convertSvgToImage = (svgString, callback) => {
    const svgBlob = new Blob([svgString], {type: `image/svg+xml; charset=utf-8`});
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
        img.onload = () => {
            callback(img);
            URL.revokeObjectURL(url);
        };
        img.src = url;
};
