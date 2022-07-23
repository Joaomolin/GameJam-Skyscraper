import { Coordinates } from "./coordinates.js";
import IsoConfig from "../isometricConfig.json" assert { type: "json" };
import PlayerInfo from "./sprite/player.json" assert {type: 'json'};
import SkeletonInfo from "./sprite/skeleton.json" assert {type: 'json'};
import { Sprite } from "./sprite/sprite.js"
export class Player {
    constructor(keyboard) {
        this.keyboard = keyboard;

        this.icon = 'icon';
        this.dir = 'A';
        this.pos = new Coordinates();
        this.walking = false;
        this.frameDelayTime = 6;


        this.NW = this.getImage(SkeletonInfo.Sheet.NW);
        this.N = this.getImage(SkeletonInfo.Sheet.N);
        this.NE = this.getImage(SkeletonInfo.Sheet.NE);
        this.W = this.getImage(SkeletonInfo.Sheet.W);
        this.E = this.getImage(SkeletonInfo.Sheet.E);
        this.SW = this.getImage(SkeletonInfo.Sheet.SW);
        this.S = this.getImage(SkeletonInfo.Sheet.S);
        this.SE = this.getImage(SkeletonInfo.Sheet.SE);

        this.dirSprite = this.S;
        this.spriteFrame = 0;
        this.frameDelay = 0;

    }

    getNextFrame(){

        if (!this.walking){
            this.frameDelay = 0;
            if (this.spriteFrame > 1 && this.spriteFrame < 5){
                this.spriteFrame = 4;
            } else {
                this.spriteFrame = 5;
            }
        } 


        if (this.frameDelay > this.getDelayTime()){
            this.frameDelay = 0;
        } else {
            this.frameDelay++;
            return this.spriteFrame;
        }

        if (this.spriteFrame > 6){
            this.spriteFrame = 0;
        } else {
            this.spriteFrame++;
        }

        return this.spriteFrame;
    }

    getDelayTime(){
        if (this.keyboard.isRunning){
            return 3;
        } else {
            return 6;
        }
    }

    getImage(dir) {
        return new Sprite(dir);
    }

    updateSpriteOrientation() {
        switch (this.dir) {
            case 'NW': this.dirSprite = this.NW; break;
            case 'N': this.dirSprite = this.N; break;
            case 'NE': this.dirSprite = this.NE; break;
            case 'W': this.dirSprite = this.W; break;
            case 'E': this.dirSprite = this.E; break;
            case 'SW': this.dirSprite = this.SW; break;
            case 'S': this.dirSprite = this.S; break;
            case 'SE': this.dirSprite = this.SE; break;
        }

    }

    movePlayer() {
        const w = this.keyboard;
        let walkAction = 0;
        if (w.walkNorth) {
            walkAction++;
        }
        if (w.walkSouth) {
            walkAction++;
        }
        if (w.walkEast) {
            walkAction++;
        }
        if (w.walkWest) {
            walkAction++;
        }

        if (walkAction == 0){
            this.walking = false;
        } else {
            this.walking = true;
        }

        const step = this.getDelayTime() === this.frameDelayTime ? 0.04 : 0.07
        if (walkAction === 1) {
            //Simple walk
            if (w.walkNorth) {
                this.pos.x -= step;
                this.pos.y -= step;
                this.dir = 'N';
            } else if (w.walkSouth) {
                this.pos.x += step;
                this.pos.y += step;
                this.dir = 'S';
            } else if (w.walkEast) {
                this.pos.x += step / 2;
                this.pos.y -= step / 2;
                this.dir = 'E';
            } else if (w.walkWest) {
                this.pos.x -= step / 2;
                this.pos.y += step / 2;
                this.dir = 'W';
            }
        } else if (walkAction === 2) {
            if (w.walkNorth && w.walkEast) {
                this.pos.y -= step;
                this.dir = 'NE';
            }
            if (w.walkNorth && w.walkWest) {
                this.pos.x -= step;
                this.dir = 'NW';
            }
            if (w.walkSouth && w.walkEast) {
                this.pos.x += step;
                this.dir = 'SE';
            }
            if (w.walkSouth && w.walkWest) {
                this.pos.y += step;
                this.dir = 'SW';
            }
        }

        this.pos.x = this.putInsideRange(this.pos.x)
        this.pos.y = this.putInsideRange(this.pos.y)

    }

    putInsideRange(num, min = IsoConfig.gridStartAt, max = IsoConfig.gridEndAt - 0.5){
        num = Math.min(num, max);
        num = Math.max(num, min);

        return num;
    }
}