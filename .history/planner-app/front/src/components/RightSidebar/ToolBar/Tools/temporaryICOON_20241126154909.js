export class IconToolControoller {
    constructor(facade, iconToolView, helperIconCreator){
      this.context = facade.getContext();
      this.drawingModel = facade.getDrawingModel();
      this.objectFactory = facade.getObjectFactory();
      this.commonHelpers = facade.getCommonHelpers();
      this.iconToolView = iconToolView;
      this.helperIconCreator = helperIconCreator;
      this.isPlacing = false;
      this.startX = 0;
      this.startY = 0;
      this.handleIconClick = this.handleIconClick.bind(this);
      this.labelInput = document.getElementById('shipName-input');
      this.currentKey = 'destroyer';
      this.color = '#ffffff';
      this.label = ' USS "Potujnuy"';
  }
  
  activateListeners() {
    document.addEventListener('click', this.handleIconClick);
    this.labelInput.addEventListener('input', this.handleLabelInput);
  }
  
  deactivateListeners() {
    document.removeEventListener('click', this.handleIconClick);
    this.labelInput.removeEventListener('input', this.handleLabelInput);
  }
  
  handleLabelInput = (event) => {
    this.setLabel(event.target.value);
  }
  
  setLabel(newLabel) {
    this.label = newLabel;
    console.log(this.label);
  }
  
  
  
  handleIconClick(event) {
    const element = event.target.closest('.setting-toolbar__icon' );
    const styleElement = event.target.closest('.tool__property-button');
    if (element) {
      const key = element.getAttribute('data-key');
      this.currentKey = key;
      }
    if(styleElement){
      const styleKey = styleElement.id;
      this.setToolStyle(styleKey);
    }
  }
  setToolStyle(key) {
    this.getStylesByKey(key);
    console.log('вызван и что')
  }
  
  getStylesByKey(key){
    const styles ={
        'alies':   {  color: '#1eff00'},
        'enemies': {  color: '#ff1900'},
        'neutral': {  color: '#31a6f5'},
    }
    this.color = styles[key] ? styles[key].color :'#4feae6' ;
    return  this.color;
  }
  
        
  
  activate() {
    this.iconToolView.showToolInterface();
    this.iconToolView.buttonActiveUI();
    this.iconToolView.showIconSettings();
    this.activateListeners();
    this.context.canvas.style.cursor = 'crosshair';
    this.context.canvas.onmousedown = (event) => this.onMouseDown(event);
    this.context.canvas.onmousemove = (event) => this.onMouseMove(event);
    this.context.canvas.onmouseup = (event) => this.onMouseUp(event);
  }
      
  deactivate() {
    this.iconToolView.hideToolInterface();
    this.iconToolView.buttonDeactiveUI();
    this.iconToolView.hideIconSettings();
    this.deactivateListeners();
  
    this.context.canvas.style.cursor = 'default';
    this.context.canvas.onmousedown = null;
    this.context.canvas.onmousemove = null;
    this.context.canvas.onmouseup = null;
    this.color = '#ffffff'
  }
  
  
  onMouseDown(event) {
      const { x, y } = this.commonHelpers.getCoordinates(event);
      this.startX = x;
      this.startY = y;
      this.isPlacing = true;
      this.helperIconCreator.loadAndRenderIcon(this.currentKey, this.color, (img) => {
      this.img = img;
      const iconWidth = 35;
      const iconHeight = 15;
      const adjusterX = x - iconWidth / 2;
      const adjusterY = y - iconHeight / 2;
      this.points = [{x: this.startX, y: this.startY}];
      if(this.img.complete){
        this.iconToolView.drawIconImage(this.img, adjusterX, adjusterY, iconWidth, iconHeight, this.color);
      }else{
        this.img.onload = () => {
          this.iconToolView.drawIconImage(this.img, adjusterX, adjusterY, iconWidth, iconHeight, this.color);
        };
      }
      
    });
  }
      onMouseMove(event){
      if (this.isPlacing) {
        const { x, y } = this.commonHelpers.getCoordinates(event);
        const tempAngle = Math.atan2(y - this.startY, x - this.startX);
        this.objectFactory.clearCanvas();
        this.objectFactory.redrawCanvas();
        if (this.img && this.img.complete) {
          this.iconToolView.tempDrawIcon(this.img, this.startX, this.startY, x, y, tempAngle, this.color);
      }; 
    }
  }
    onMouseUp(event){
      if (this.isPlacing) {
        const { x, y } = this.commonHelpers.getCoordinates(event);
        const font = '22px Arial';
        const endX = x;
        const endY = y;
        const angle = Math.atan2(endY - this.startY, endX - this.startX);
        this.objectFactory.clearCanvas();
        this.objectFactory.redrawCanvas();
        this.iconToolView.redrawIconWithAngle(this.img, this.startX, this.startY, angle, this.label, font , this.color);
        let object = this.objectFactory.createObject(this.points, 'icon', {
            img: this.img,
            angle: angle,
            color: this.color,
            model: this.currentKey,
            label: this.label,
            font: font,
            textColor: this.color
        });
  
        this.drawingModel.addObject(object);
        console.log(object);
  
        this.points = [];
        this.isPlacing = false;  
      }
    }
  }