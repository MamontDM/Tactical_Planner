export class VisionToolController{
    constructor(facade, visionToolView){
        this.context = facade.getContext();
        this.drawingModel = facade.getDrawingModel();
        this.objectFactory = facade.getObjectFactory();
        this.commonHelpers = facade.getCommonHelpers();
        this.visionToolView = visionToolView;
        this.isDrawing = false;
        this.startX = 0;
        this.startY = 0;
        this.radius = 0;
        this.diametr = 700;
        this.lineWidth = 2;
        this.strokeStyle = '#ffffff';
        this.handleIconClick = this.handleIconClick.bind(this);

      }

    activateListeners() {
      document.addEventListener('click', this.handleIconClick);
    }
  
    deactivateListeners() {
      document.removeEventListener('click', this.handleIconClick);
    }

    handleIconClick(event) {
      const radarPreSet = event.target.closest('.radar__property-button');
      const customRadarRangeInput = event.target.closest('.input__range');
        if(radarPreSet){
          const dataKey = radarPreSet.getAttribute('data-key');
          this.setToolStyle(dataKey);
        }else if(customRadarRangeInput){
          const customRangeValue = customRadarRangeInput.value;
        this.diametr = customRangeValue;
        }
      }

      setToolStyle(key) {
        const styles ={
          '9.5':   { lineWidth: 3,   strokeStyle: '#31a6f5', diametr: 250},
          '10':    { lineWidth: 3,   strokeStyle: '#31a6f5', diametr: 350},
          '12':    { lineWidth: 3,   strokeStyle: '#31a6f5', diametr: 450},
      }
      this.lineWidth = styles[key].lineWidth;
      this.strokeStyle = styles[key].strokeStyle;
      this.diametr = styles[key].diametr;
      return  this.strokeStyle, this.lineWidth;
    }

    activate(){
      this.visionToolView.showToolInterface();
      this.visionToolView.buttonActiveUI();
      this.context.canvas.style.cursor = 'crosshair';
      this.context.canvas.onclick = (event) => this.onClick(event); 
      this.context.canvas.onmousedown = null;
      this.context.canvas.onmousemove = null;
      this.context.canvas.onmouseup = null;
      this.activateListeners();
        
    }
  
      deactivate(){
        this.visionToolView.hideToolInterface();
        this.visionToolView.buttonDeactiveUI();
        this.context.canvas.onclick = null;
        this.context.canvas.onmousedown = null;
        this.context.canvas.onmousemove = null;
        this.context.canvas.onmouseup = null;
        this.isDrawing = false;
        this.context.canvas.style.cursor = 'default';
        this.deactivateListeners();
        this.strokeStyle = '#ffffff';
      }

    
    onClick(event) {
      const { x, y } = this.commonHelpers.getCoordinates(event);
      this.visionToolView.setStylesFromController(this.lineWidth, this.strokeStyle);
      this.startX = x;
      this.startY = y;
      this.radius = this.diametr / 2;
      this.visionToolView.drawCircle(this.startX, this.startY, this.radius);
      this.points = [{x: this.startX, y:this.startY}];  


      this.visionToolView.drawCircle(this.startX, this.startY, this.radius);
      const object = this.objectFactory.createObject(this.points, 'vision', {
        radius: this.radius,
        lineWidth: this.lineWidth,
        strokeStyle: this.strokeStyle
      }); 
      
        this.drawingModel.addObject(object);
        console.log(object)
        
        this.isDrawing = false;
        
      }
    }