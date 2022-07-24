import { Tile } from "../tile.js";
import { Coordinates } from "../coordinates.js";
import CubeSheet from "../../assets/mapSheet.json" assert {type: 'json'};
export class Skyscraper {
    constructor(map){
        this.map = map;
    }

    upgradeTile(){
        const x = Math.floor(this.map.selectedTile.coord.x);
        const y = Math.floor(this.map.selectedTile.coord.y);
        
        let toSend;
        const rand = Math.random().toFixed(1);
        
        switch(rand){
            case '0.1':
            case '0.2':
            case '0.3':
                toSend = CubeSheet.Printer; break;
            case '0.4':
            case '0.5':
            case '0.6':
                toSend = CubeSheet.Worker; break;
            case '0.7':
            case '0.8':
            case '0.9':
            default: 
                toSend = CubeSheet.Phone; break;
        }
        
        this.map.placed[y][x] = new Tile(new Coordinates(x, y), toSend);
    }
}