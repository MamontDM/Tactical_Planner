
export const getCoordinates(event) {
    const positionRect = this.context.canvas.getBoundingClientRect();
    const scaleX = this.context.canvas.width / positionRect.width;
    const scaleY = this.context.canvas.height / positionRect.height;
    const x = (event.clientX - positionRect.left) * scaleX;
    const y = (event.clientY - positionRect.top) * scaleY;
    return { x , y };
  }



export class CommonHelpers{
    constructor(context, drawingModel){
      this.context = context;
      this.drawingModel = drawingModel;
    }
     
  
      getCoordinates(event) {
        const positionRect = this.context.canvas.getBoundingClientRect();
        const scaleX = this.context.canvas.width / positionRect.width;
        const scaleY = this.context.canvas.height / positionRect.height;
        const x = (event.clientX - positionRect.left) * scaleX;
        const y = (event.clientY - positionRect.top) * scaleY;
        return { x , y };
      }

findClosestObject(x , y){
    for (let object of this.drawingModel.getObjects()) {
      switch (object.type){
        case 'text':{
            const textWidth = this.context.measureText(object.text).width;
            const textHeight = parseInt(object.font, 10); 
            if (x >= object.points[0].x && x <= object.points[0].x + textWidth &&
              y >= object.points[0].y - textHeight && y <= object.points[0].y) {
              return object; 
          }
          break;
      }
        
        case 'icon': {
            const iconWidth = 50;  
            const iconHeight = 50; 
            if (x >= object.points[0].x && x <= object.points[0].x + iconWidth &&
            y >= object.points[0].y && y <= object.points[0].y + iconHeight) {
            return object; 
          }
          break;
      }
        case 'vision': {
          if(this.isPointOnCircle(object, x, y)){
              return object;
          }
        break;
      }

        case 'area':{
          console.log('click');
          if(this.isPointInSector(object, x, y)){
            console.log("РќР°Р№РґРµРЅ РѕР±СЉРµРєС‚ С‚РёРїР° 'area'");
            return object;
          }
          break;
        }

      default: {
        if(this.contains(object, x, y)){
          console.log(object);
          return object; 
        }
      }
    } 
  }
  return null;
}   

isPointOnCircle(object, x, y, tolerance = 5) {
  if (object.type !== 'vision' || !object.radius || !object.points || object.points.length === 0) {
  return false;
}
  
  const centerX = object.points[0].x;
  const centerY = object.points[0].y;
  const radius = object.radius;
  
         
const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
  return Math.abs(distance - radius) <= tolerance;
}
     
     
contains(object, x, y) {
      if (!Array.isArray(object.points)) {
        return false;
    }
      for (let point of object.points) {
      const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
      if (distance <= 10) {
      return true;
      }
    }
  return false;
}
  

  isPointInSector(object, clickX, clickY) {
      const centerX = object.x;
      const centerY = object.y;
      const radius = object.radius;
      const distance = Math.sqrt((clickX - centerX) ** 2 + (clickY - centerY) ** 2);
      
      if (distance > radius) {
          return false; 
      }

      const angle = Math.atan2(clickY - centerY, clickX - centerX);
      let normalizedAngle = angle;

      normalizedAngle = (normalizedAngle - object.rotationAngle) % (2 * Math.PI);

      if (normalizedAngle < 0) {
          normalizedAngle += 2 * Math.PI;
      }
      
      
      const startAngle = object.startAngle;
      const endAngle = object.endAngle;

      console.log(`РќРѕСЂРјР°Р»РёР·РѕРІР°РЅРЅС‹Р№ СѓРіРѕР» РєР»РёРєР°: ${normalizedAngle}, РЈРіРѕР» РЅР°С‡Р°Р»Р°: ${startAngle}, РЈРіРѕР» РєРѕРЅС†Р°: ${endAngle}`);
      if (normalizedAngle >= startAngle && normalizedAngle <= endAngle) {
        console.log('kuku')
          return true; 
      }
      return false;
    }
  }




export class IconCreatorAndModifyer {
  constructor(){
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
    console.log('С†РµР¶ Р±СѓР»Рѕ РІР¶Рµ!"')
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
        
    svgToDataUrl(svgString){
      const encodedSvg = new TextEncoder().encode(svgString);
      const base64Svg = btoa(String.fromCharCode(...encodedSvg));
      return `data:image/svg+xml;base64,${base64Svg}`;
    }
}
  
  
  
  
  