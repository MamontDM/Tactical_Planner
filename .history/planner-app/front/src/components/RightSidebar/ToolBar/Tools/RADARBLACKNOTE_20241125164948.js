export class RadarZoneToolController{
    constructor(facade, radarZoneView){
    this.context = facade.getContext();
    this.drawingModel = facade.getDrawingModel();
    this.objectFactory = facade.getObjectFactory();
    this.commonHelpers = facade.getCommonHelpers();
    this.radarZoneView = radarZoneView;
    this.radius = 150;
    this.isPlacing = false;
    this.isDrawing = false;
    this.startX = 0;
    this.startY = 0;
    this.rotationAngle = null;
    this.startAngle = null;
    this.endAngle = null;
    this.area = null;
    this.points = []; 
    this.handleIconClick = this.handleIconClick.bind(this);
    }
activateListeners() {
    document.addEventListener('click', this.handleIconClick);
}
    
deactivateListeners() {
    document.removeEventListener('click', this.handleIconClick);
}
  
handleIconClick(event) {
const areaPreSet = event.target.closest('.area__property-button');
const customAreaRangeInput = event.target.closest('.input__angle');
    if(areaPreSet){
        const dataKey = areaPreSet.getAttribute('data-key');
        this.setRadius(dataKey)
        }else if(customAreaRangeInput){
            const customRangeValue = customAreaRangeInput.value;
          this.radius = customRangeValue;
          }
    }
setRadius(dataKey){
    this.area = dataKey;
}

activate(){
    this.radarZoneView.showToolInterface();
    this.radarZoneView.buttonActiveUI();
    this.context.canvas.style.cursor = 'crosshair';
    this.context.canvas.onmousedown = (event) => this.onMouseDown(event);
    this.context.canvas.onmousemove = (event) => this.onMouseMove(event);
    this.context.canvas.onmouseup = (event) => this.onMouseUp(event);
    this.activateListeners();
}
deactivate(){
    this.radarZoneView.hideToolInterface();
    this.radarZoneView.buttonDeactiveUI();
    this.context.canvas.onmousedown = null;
    this.context.canvas.onmousemove = null;
    this.context.canvas.onmouseup = null;
    this.isDrawing = false;
    this.context.canvas.style.cursor = 'default';
    this.deactivateListeners();
}

onMouseDown(event) {
const { x, y } = this.commonHelpers.getCoordinates(event);
this.isDrawing = true;
this.objectFactory.redrawCanvas();
    this.startX = x;
    this.startY = y;
    this.rotationAngle = 0;
    this.startAngle = 0;
    const angleInRadians = (this.area * Math.PI) / 180;
    this.endAngle = this.startAngle + angleInRadians;
    this.strokeStyle = 'black',
    this.fillStyle = 'rgba(152, 219, 255, 0.11)';

    this.objectFactory.clearCanvas();
    this.objectFactory.redrawCanvas();

    this.radarZoneView.drawArea(
        this.startX, 
        this.startY, 
        this.radius, 
        this.startAngle, 
        this.endAngle, 
        this.rotationAngle, 
        this.strokeStyle,
        this.fillStyle
    );
    
}

onMouseMove(event) {
    if (!this.isDrawing) return;
    const { x, y } = this.commonHelpers.getCoordinates(event);
    const endX = x;
    const endY = y;

    this.rotationAngle = Math.atan2(endY - this.startY, endX - this.startX);
    this.objectFactory.clearCanvas();
    this.objectFactory.redrawCanvas();

    this.radarZoneView.drawArea(
        this.startX, 
        this.startY, 
        this.radius, 
        this.startAngle, 
        this.endAngle, 
        this.rotationAngle, 
        this.strokeStyle,
        this.fillStyle
    );
}

onMouseUp(event) {
    
    if (!this.isDrawing) return;
    this.isDrawing = false;
    let object = this.objectFactory.createObject(null, 'area', {
        x: this.startX,
        y: this.startY,
        radius: this.radius,
        startAngle: this.startAngle,
        endAngle: this.endAngle,
        rotationAngle: this.rotationAngle,
        strokeStyle: this.strokeStyle,
        fillStyle: this.fillStyle
    });
    this.drawingModel.addObject(object);
    console.log(object);
    this.objectFactory.clearCanvas();
    this.objectFactory.redrawCanvas();

    this.points = [];
    this.isPlacing = false;  
  }
}