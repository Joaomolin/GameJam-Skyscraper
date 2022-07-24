import { Coordinates } from "./coordinates.js";
import Config from "../isometricConfig.json" assert { type: "json" };

export class Isometric {
    constructor(mouse, player){
        this.camera = new Coordinates();
        this.mouse = mouse;
        this.player = player;
        this.IsoW = Config.cellWidth;
        this.IsoH = Config.cellHeight;
        this.IsoX = 400;
        this.IsoY = -150;
    }


    updateCamera(){
        if (!this.updateCameraByMouse()){
            this.updateCameraByPlayer();
        }
        
    }

    updateCameraByPlayer(){
        if (!this.player.keyboard.snapCameraToPlayer) return;
        const step = 150;
        //Right
        if (this.IsoToScreenX(this.player.pos.x, this.player.pos.y)> canvas.width - (canvas.width / 8)){
            this.camera.x -= step * 2;
        }
        //Left
        if (this.IsoToScreenX(this.player.pos.x, this.player.pos.y) < canvas.width / 8){
            this.camera.x += step * 2;
        }
        //Up
        if (this.IsoToScreenY(this.player.pos.x, this.player.pos.y) < canvas.height / 4){
            this.camera.y += step;
        }
        //Down
        if (this.IsoToScreenY(this.player.pos.x, this.player.pos.y) > canvas.height - (canvas.height / 8)){
            this.camera.y -= step;
        }

    }

    updateCameraByMouse(){
        const step = 8;
        //Right
        if (this.mouse.x > canvas.width - (canvas.width / 8)){
            this.camera.x -= step;
            return true;
        }
        //Left
        if (this.mouse.x < canvas.width / 8){
            this.camera.x += step;
            return true;
        }
        //Up
        if (this.mouse.y < canvas.height / 5){
            this.camera.y += step;
            return true;
        }
        //Down
        if (this.mouse.y > canvas.height - (canvas.height / 5)){
            this.camera.y -= step;
            return true;
        }

        return false;
    }

    IsoToScreenX(localX, localY) {
        return this.IsoX + (localX - localY) * this.IsoW + this.camera.x;
    }
    IsoToScreenY(localX, localY) {
        return this.IsoY + (localX + localY) * this.IsoH + this.camera.y;
    }
    ScreenToIsoX(globalX, globalY) {
        let res = ((globalX - this.IsoX) / this.IsoW + (globalY - this.IsoY) / this.IsoH) / 2;
        res += (-this.camera.x / (this.IsoW * 2))
        res += (-this.camera.y / (this.IsoH * 2))
        return res;
    }
    ScreenToIsoY(globalX, globalY) {
        let res = ((globalY - this.IsoY) / this.IsoH - (globalX - this.IsoX) / this.IsoW) / 2;
        res += (this.camera.x / (this.IsoW * 2))
        res += (-this.camera.y / (this.IsoH * 2))
        return res;
    }
}