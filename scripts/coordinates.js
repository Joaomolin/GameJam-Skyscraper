export class Coordinates {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
    getInString(offset = 0){
        return `${(this.x + offset).toFixed(0)}, ${(this.y + offset).toFixed(0)}`;
    }
}