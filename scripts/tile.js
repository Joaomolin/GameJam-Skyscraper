
import { Sprite } from "./sprite/sprite.js";
export class Tile {
    constructor(coord, sprite) {
        //Main
        this.coordinates = coord;

        //Iso
        this.sprite = new Sprite(sprite);

        //Cart
        this.color = sprite.color;

        this.info = sprite;
    }
}