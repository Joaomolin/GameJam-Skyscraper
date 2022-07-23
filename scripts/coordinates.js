export class Coordinates {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
    getInString(){
        return `${this.x.toFixed(1)}, ${this.y.toFixed(1)}`;
    }
}