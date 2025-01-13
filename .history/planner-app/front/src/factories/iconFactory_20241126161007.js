export function IconCreatorAndModifyer = () => {
      this.icons = {
        battleship: "../Images/icons/battleship.svg",
        cruiser: "../Images/icons/cruiser.svg",
        destroyer: "../Images/icons/destroyer.svg"
      };
      this.cache = {};
    }
  
    modifySvg(svgIcon, color) {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgIcon, "image/svg+xml");
      const polygonElement = svgDoc.querySelectorAll('polygon');
     
      polygonElement.forEach(polygon => {
        polygon.setAttribute('fill', color);
      });
  
      const serializer = new XMLSerializer();
      return serializer.serializeToString(svgDoc.documentElement);
  }
  
  loadAndRenderIcon(iconKey , color, callback){
    const cacheKey = `${iconKey}_${color}`;
    if (this.cache[cacheKey]) {
      callback(this.cache[cacheKey]);
      console.log('цеж було вже!"')
      return;
    }
  
    const svgPath = this.icons[iconKey];
    if(!svgPath){
      console.error(`Icon with key ${iconKey} not found`)
      return;
    }
        fetch(svgPath)
          .then(response => response.text())
          .then(svgIcon => {
          const modifySvg = this.modifySvg(svgIcon, color);
          const dataUrl = this.svgToDataUrl(modifySvg);
  
           const img = new Image();
            img.onload = () =>{
              this.cache[cacheKey] = img;
               if(callback){
            callback(img);
            }
          };
          img.src = dataUrl;
      })
      .catch(error => console.error('Error loading or processing SVG:', error));
  }
          
      function svgToDataUrl = (svgString) => {
        const encodedSvg = new TextEncoder().encode(svgString);
        const base64Svg = btoa(String.fromCharCode(...encodedSvg));
        return `data:image/svg+xml;base64,${base64Svg}`;
      }
  }
