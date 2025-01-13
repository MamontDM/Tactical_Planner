export const getSvgTemplate = (type, color) => {
    const templates = {
        Destroyer: 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 150" width="250" height="150">
            <polygon fill="${color}" stroke="black" stroke-width="1" points="204.7 63.11 0 0 0 132.64 204.7 63.11" />
        </svg>`,
        SuperDestroyer: 
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 150" width="250" height="150">
                <polygon fill="#cccccc" stroke="black" stroke-width="1" points="204.7 63.11 0 0 0 132.64 204.7 63.11" />
                <polygon fill="#000000" transform="translate(10, -10) rotate(15, 75, 75)"  points="54.27 27.04 69.47 58.17 103.45 63.16 78.86 87.39 84.67 121.6 54.27 105.45 23.88 121.6 29.68 87.39 5.09 63.16 39.07 58.17 54.27 27.04" />
            </svg>`,
        Cruiser:
            `<svg id="uuid-9807c151-86f7-4689-abee-aecc1c73db6b" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 335.5 155">
                    <polygon fill="${color}" class="uuid-c5ace427-beea-4f5c-98a0-99f3e87ccc72" points="218.95 .81 136.77 154.5 253.67 154.4 335.5 77.46 253.41 .81 218.95 .81"/>
                    <polygon fill="${color}" class="uuid-d15842ec-0213-4902-9dab-669588492087" points="161.05 .9 1.33 .5 .5 154.5 74.08 154.5 161.05 .9"/>
                </svg>`,
        SuperCruiser:
            `<svg id="uuid-9807c151-86f7-4689-abee-aecc1c73db6b" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 335.5 155">
                <polygon fill="${color}" class="uuid-c5ace427-beea-4f5c-98a0-99f3e87ccc72" points="218.95 .81 136.77 154.5 253.67 154.4 335.5 77.46 253.41 .81 218.95 .81"/>
                <polygon fill="${color}" class="uuid-d15842ec-0213-4902-9dab-669588492087" points="161.05 .9 1.33 .5 .5 154.5 74.08 154.5 161.05 .9"/>
                <polygon fill="#000000" class="uuid-2748157d-0314-4e38-9e96-d122906c31c5" points="246.01 27.04 261.21 58.17 295.19 63.16 270.6 87.39 276.4 121.6 246.01 105.45 215.61 121.6 221.42 87.39 196.83 63.16 230.81 58.17 246.01 27.04"/>
                <polygon fill="#000000" class="uuid-2748157d-0314-4e38-9e96-d122906c31c5" points="54.27 27.04 69.47 58.17 103.45 63.16 78.86 87.39 84.67 121.6 54.27 105.45 23.88 121.6 29.68 87.39 5.09 63.16 39.07 58.17 54.27 27.04"/>
            </svg>`,
        Battleship: 
            `<svg id="uuid-19b12959-7e1d-4b9d-a9c1-62992c23c231" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 346.67 154">
                <polygon fill="${color}" stroke-width="0px" points="0 153.51 41.79 153.94 135.83 .43 .87 0 0 153.51"/>
                <polygon fill="${color}" stroke-width="0px" points="173.48 .36 212.93 .36 118.73 153.94 79.28 153.94 173.48 .36"/>
                <polygon fill="${color}" stroke-width="0px" points="252.3 .3 346.67 77.15 252.88 154 158.51 154 252.3 .3"/>
            </svg>`,
        SuperBattleship: 
            `<svg id="uuid-19b12959-7e1d-4b9d-a9c1-62992c23c231" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 346.67 154">
                <polygon fill="${color}" stroke-width="0px" points="0 153.51 41.79 153.94 135.83 .43 .87 0 0 153.51"/>
                <polygon fill="${color}" stroke-width="0px" points="173.48 .36 212.93 .36 118.73 153.94 79.28 153.94 173.48 .36"/>
                <polygon fill="${color}" stroke-width="0px" points="252.3 .3 346.67 77.15 252.88 154 158.51 154 252.3 .3"/>
                <polygon fill="#000000" transform="translate(200, 10)" points="54.27 27.04 69.47 58.17 103.45 63.16 78.86 87.39 84.67 121.6 54.27 105.45 23.88 121.6 29.68 87.39 5.09 63.16 39.07 58.17 54.27 27.04"/>
                <polygon fill="#000000" transform="translate( 0, -30)" points="54.27 27.04 69.47 58.17 103.45 63.16 78.86 87.39 84.67 121.6 54.27 105.45 23.88 121.6 29.68 87.39 5.09 63.16 39.07 58.17 54.27 27.04"/>
            </svg>`, 
            Carrier: 
            `<svg id="uuid-7dd4bd05-ecf2-425d-8ebe-d6a307636daf" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340.48 151.81">
                <rect fill="${color}" class="uuid-c8645f5e-1211-460d-aa79-a6bfeaa0fff5" x=".5" y="1.2" width="241.65" height="67.75"/>
                <rect  fill="${color}" class="uuid-39ea2ef7-88a3-41ae-a51d-bf6631802274" x=".5" y="81.84" width="241.65" height="68.78"/>
                <polygon fill="${color}" class="uuid-c8645f5e-1211-460d-aa79-a6bfeaa0fff5" points="339.76 75.91 264.09 1.2 264.09 150.62 339.76 75.91"/>
            </svg>`,

            Submarine: 
            `<svg id="uuid-07a49578-6cba-4792-aa0b-7a927e8c0676" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338.06 150.56">
                <rect fill="${color}" class="uuid-24fd16f4-33de-4acf-a285-8f404cc9b68a" x=".5" y=".5" width="15.85" height="149.42"/>
                <polygon fill="${color}" class="uuid-24fd16f4-33de-4acf-a285-8f404cc9b68a" points="335.93 75.3 27.68 .68 27.68 149.92 335.93 75.3"/>
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
