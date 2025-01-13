export class IconToolView{
    constructor(context){
        this.context = context;
        this.mainPanel = document.getElementById('setting-container');
        this.settingsPanel = document.getElementById('tool-settings');
        this.iconElement = document.getElementById('iconTool-settings')
        this.activeButton = document.getElementById('icon');
    }
    buttonActiveUI(){
        this.activeButton.classList.add('toolbar__button--active')
    }
    buttonDeactiveUI(){
        this.activeButton.classList.remove('toolbar__button--active');
    }
    showToolInterface() {
        this.mainPanel.classList.remove('hidden');
        this.mainPanel.classList.add('animation-visible');
        this.settingsPanel.classList.remove('hidden');
        this.settingsPanel.classList.add('animation-visible');
    }

    hideToolInterface() {
        this.mainPanel.classList.remove('animation-visible');
        this.mainPanel.classList.add('hidden');
        
        this.settingsPanel.classList.remove('animation-visible');
        this.settingsPanel.classList.add('hidden');
    }
    
    showIconSettings() {
        this.iconElement.classList.remove('hidden');
        this.iconElement.classList.add('animation-visible')
    }

    hideIconSettings() {
        this.iconElement.classList.remove('animation-visible')
        this.iconElement.classList.add('hidden');
        
    }
   
    

    
    drawIconImage(img, x, y, width, height){
        this.context.drawImage(img, x, y, width, height);
       
    }
    tempDrawIcon(img, startX, startY, x, y, tempAngle){
        const angle = Math.atan2(y - this.startY, x - this.startX);
        this.context.save(); 
        this.context.translate(startX, startY); 
        this.context.rotate(tempAngle); 
        this.context.drawImage(img, -25, -12.5, 35, 15); 
        this.context.restore(); 
}
redrawIconWithAngle(img, startX, startY, angle, text, font , textColor ){
    
    this.context.save();
    this.context.translate(startX, startY); 
    this.context.rotate(angle); 
    this.context.drawImage(img, -25, -12.5, 35, 15);
    this.context.translate(0, 25); 
    this.context.rotate(-angle); 
    this.context.textAlign = 'center'; 
    this.context.fillStyle = textColor;
    this.context.font = font;
    this.context.fillText(text, 0, 0)
    this.context.restore();
    }
}