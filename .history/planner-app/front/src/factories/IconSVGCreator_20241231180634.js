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
        `<svg id="uuid-19b12959-7e1d-4b9d-a9c1-62992c23c231" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 346.67 154">
            <polygon fill="${color}" stroke-width="0px" points="0 153.51 41.79 153.94 135.83 .43 .87 0 0 153.51"/>
            <polygon fill="${color}" stroke-width="0px" points="173.48 .36 212.93 .36 118.73 153.94 79.28 153.94 173.48 .36"/>
            <polygon fill="${color}" stroke-width="0px" points="252.3 .3 346.67 77.15 252.88 154 158.51 154 252.3 .3"/>
        </svg>`, 
        SuperShip: 
        `<svg fill="${color}" viewBox="0 0 0 550" xmlns="http://www.w3.org/2000/svg">
    <path d="M469.763,168.459c-1.004-3.091-3.884-5.183-7.133-5.183h-12.427c-11.331-28.577-28.483-54.807-50.875-77.199
        c-31.411-31.411-70.891-52.832-114.17-61.946c-4.05-0.857-8.031,1.74-8.885,5.793c-0.854,4.054,1.74,8.031,5.793,8.885
        c40.426,8.514,77.306,28.527,106.654,57.876c19.726,19.726,34.764,42.389,45.133,66.592H296.401L245.033,5.183
        C244.029,2.092,241.149,0,237.9,0s-6.129,2.092-7.133,5.183l-51.368,158.094H41.946c10.368-24.203,25.406-46.866,45.132-66.592
        c29.033-29.033,65.488-48.956,105.425-57.613c4.048-0.878,6.619-4.871,5.741-8.919c-0.877-4.048-4.874-6.62-8.918-5.741
        c-42.756,9.27-81.781,30.594-112.854,61.666c-22.392,22.392-39.544,48.622-50.875,77.199H13.17c-3.249,0-6.129,2.092-7.133,5.183
        c-1.004,3.09,0.096,6.476,2.725,8.385l9.779,7.105c-5.878,20.398-8.934,41.742-8.934,63.557c0,60.979,23.747,118.31,66.866,161.429
        c5.715,5.715,11.687,11.079,17.876,16.103l-2.472,7.609c-1.004,3.09,0.096,6.476,2.725,8.385c1.314,0.955,2.861,1.433,4.408,1.433
        s3.094-0.478,4.408-1.433l6.283-4.565c37.521,25.571,81.8,39.333,128.2,39.333s90.679-13.762,128.201-39.333l6.283,4.565
        c1.314,0.955,2.861,1.433,4.408,1.433s3.094-0.478,4.408-1.433c2.629-1.909,3.729-5.295,2.725-8.385l-2.472-7.609
        c6.19-5.024,12.161-10.388,17.876-16.103c43.119-43.119,66.865-100.449,66.865-161.429c0-21.816-3.055-43.159-8.934-63.558
        l9.778-7.105C469.668,174.935,470.767,171.549,469.763,168.459z M294.773,178.276h142.43l-187.124,61.516l27.935-38.449
        L294.773,178.276z M225.764,239.853l-41.058,13.341l-31.329,10.18L36.253,178.277L225.764,239.853z M113.275,415.328L230.4,254.119
        v76.112L113.275,415.328L113.275,415.328z M245.421,254.126l72.367,23.514l44.531,137.049L245.421,254.126z M237.9,31.771
        L237.9,31.771l0,199.265l0,0l-44.738-61.576L237.9,31.771z M87.078,398.327c-55.42-55.42-73.894-133.997-55.45-204.87
        l111.616,81.095L99.341,409.671C95.143,406.078,91.05,402.299,87.078,398.327z M122.698,427.023l115.202-83.7l115.202,83.699
        C283.189,471.906,192.612,471.906,122.698,427.023z M388.721,398.327c-3.972,3.972-8.064,7.751-12.262,11.343l-43.903-135.118
        l111.616-81.095C462.616,264.33,444.142,342.907,388.721,398.327z"/>
</svg>
`,
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