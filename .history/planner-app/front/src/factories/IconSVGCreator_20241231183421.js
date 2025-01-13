export const getSvgTemplate = (type, color) => {
    const templates = {
        Destroyer: 
        `<svg id="uuid-0a734424-3953-45f4-bd29-22571a09dc3c" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204.7 132.64">
            <polygon fill="${color}" stroke-width="0px" points="204.7 63.11 0 0 0 132.64 204.7 63.11"/>
        </svg>
        `,
        Cruiser: 
        `<svg id="_Слой_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 347.2 155">
            <g id="uuid-e9367c4c-95b3-4e39-b056-31b48712996f">
            <polygon fill="${color}" points="213.6 .9 119.4 154.5 253.4 154.4 347.2 77.5 253.1 .9 213.6 .9" stroke-width="0"/></g>
            <g id="_Слой_2">
            <polygon fill="${color}" points="174.4 .9 1.4 .5 .5 154.5 80.2 154.5 174.4 .9" stroke="#0a0a0a" stroke-miterlimit="10"/></g>
        </svg>
        `,
        Battleship: 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" height="200">
  <!-- Левый лавр -->
  <path d="M60,100 C40,80 40,50 60,30 C50,70 50,130 60,170 C40,150 40,120 60,100" fill="none" stroke="green" stroke-width="3" />
  <path d="M60,30 C65,40 70,50 75,60 C70,40 65,30 60,30" fill="green" />
  <path d="M60,170 C65,160 70,150 75,140 C70,160 65,170 60,170" fill="green" />

  <!-- Правый лавр -->
  <path d="M340,100 C360,80 360,50 340,30 C350,70 350,130 340,170 C360,150 360,120 340,100" fill="none" stroke="green" stroke-width="3" />
  <path d="M340,30 C335,40 330,50 325,60 C330,40 335,30 340,30" fill="green" />
  <path d="M340,170 C335,160 330,150 325,140 C330,160 335,170 340,170" fill="green" />

  <!-- Линкор -->
  <polygon fill="blue" stroke-width="0px" points="100 150 141.79 150 235.83 0 100 0" />
  <polygon fill="blue" stroke-width="0px" points="173.48 0 212.93 0 118.73 150 79.28 150 173.48 0" />
  <polygon fill="blue" stroke-width="0px" points="252.3 0 346.67 77.15 252.88 150 158.51 150 252.3 0" />
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