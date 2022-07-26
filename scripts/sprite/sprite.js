export class Sprite {
    constructor(spriteInfo) {
        this.info = spriteInfo;
        const image = new Image();
        image.src = spriteInfo.src;
        this.img = image;
    
        this.imgX = spriteInfo.sheetPosX;
        this.imgY = spriteInfo.sheetPosY;
        this.imgW = spriteInfo.sheetPosWidth;
        this.imgH = spriteInfo.sheetPosHeight;
        
        this.xOffset = spriteInfo.xOffset;
        this.yOffset = spriteInfo.yOffset;
        this.xSize = spriteInfo.xSize;
        this.ySize = spriteInfo.ySize;
    }
}