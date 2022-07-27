import { Coordinates } from "../coordinates.js";
import { Sprite } from "../sprite/sprite.js";
import CubeSheet from "../../assets/mapSheet.json" assert {type: 'json'};

export class Hud {

    constructor(canvas, ctx, game, keyboard) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.game = game;
        this.keyboard = keyboard;

        this.hudBtns = [];
        this.selectedBtn = 1;

        this.skyscraperSprite = new Sprite(CubeSheet.SkyScraper);
        this.stopwatchSprite = new Sprite(CubeSheet.Stopwatch);
        this.coinSprite = new Sprite(CubeSheet.Coin);
        this.documentSprite = new Sprite(CubeSheet.Document);
        this.printerSprite = new Sprite(CubeSheet.Printer);
        this.workerSprite = new Sprite(CubeSheet.Worker);
        this.phoneSprite = new Sprite(CubeSheet.Phone);

        this.hudSize = new Coordinates(250, 140);

        this.startHud();
    }

    startHud() {
        let pos = canvas.width + 8;
        const toSubtract = canvas.width / 3;
        this.hudBtns.push(new HudItem('3', this, pos -= toSubtract, CubeSheet.Phone));
        this.hudBtns.push(new HudItem('2', this, pos -= toSubtract, CubeSheet.Worker));
        this.hudBtns.push(new HudItem('1', this, pos -= toSubtract, CubeSheet.Printer));
        this.hudBtns.reverse();

        this.setSelectedBtn(this.selectedBtn)
    }

    draw() {
        this.drawHud();
        this.drawButtons();

    }

    drawHud() {
        this.ctx.font = "30px open-sans";
        this.ctx.fillStyle = "3d7b9a";



        this.drawDeals();
        this.drawPrinters();
        this.drawPhones();
        this.drawWorkers();
        this.drawWallet();
        this.drawStopwatch();
        this.drawFloors();

    }

    drawWallet(){
        this.ctx.fillText(this.game.wallet, 720, 165);
        this.ctx.drawImage(
            this.coinSprite.img,
            this.coinSprite.imgX,
            this.coinSprite.imgY,
            this.coinSprite.imgW,
            this.coinSprite.imgH,
            650,
            125,
            64, 64
        );
    }

    drawFloors(){
        this.ctx.fillText(this.game.floors, 720, 105);
        this.ctx.drawImage(
            this.skyscraperSprite.img,
            this.skyscraperSprite.imgX,
            this.skyscraperSprite.imgY,
            this.skyscraperSprite.imgW,
            this.skyscraperSprite.imgH,
            660,
            70,
            48, 48
        );
    }

    drawWorkers() {
        this.ctx.fillText(this.game.totalWorkers, 336, 50);
        this.ctx.fillText(`+${this.game.worker} (${this.game.workerDemand})`, 336, 80);
        this.ctx.drawImage(
            this.workerSprite.img,
            this.workerSprite.imgX,
            this.workerSprite.imgY,
            this.workerSprite.imgW,
            this.workerSprite.imgH,
            256, -22,
            96, 96
        );
    }

    drawPhones() {
        this.ctx.fillText(this.game.totalPhones, 464, 50);
        this.ctx.fillText(`+${this.game.phone} (${this.game.phoneDemand})`, 464, 80);
        this.ctx.drawImage(
            this.phoneSprite.img,
            this.phoneSprite.imgX,
            this.phoneSprite.imgY,
            this.phoneSprite.imgW,
            this.phoneSprite.imgH,
            384, -28,
            96, 96
        );
    }

    drawPrinters() {
        this.ctx.fillText(`${this.game.totalPrinters}`, 208, 50);
        this.ctx.fillText(`+${this.game.printer} (${this.game.printerDemand})`, 208, 80);
        this.ctx.drawImage(
            this.printerSprite.img,
            this.printerSprite.imgX,
            this.printerSprite.imgY,
            this.printerSprite.imgW,
            this.printerSprite.imgH,
            118, -28,
            96, 96
        );
    }

    drawDeals() {
        this.ctx.fillText(`${this.game.finishedDeals}`, 80, 50);
        this.ctx.drawImage(
            this.documentSprite.img,
            this.documentSprite.imgX,
            this.documentSprite.imgY,
            this.documentSprite.imgW,
            this.documentSprite.imgH,
            0, -16,
            96, 96
        );
    }

    drawStopwatch() {
        this.ctx.fillText(this.game.secondsLeft, 720, 45);
        this.ctx.drawImage(
            this.stopwatchSprite.img,
            this.stopwatchSprite.imgX,
            this.stopwatchSprite.imgY,
            this.stopwatchSprite.imgW,
            this.stopwatchSprite.imgH,
            640,
            -10,
            96, 96
        );
    }

    drawButtons() {
        this.ctx.font = "25px open-sans";
        this.ctx.lineWidth = 5;

        for (let i = 0; i < this.hudBtns.length; i++) {
            const item = this.hudBtns[i];
            this.ctx.fillStyle = "#3d7b9a";
            this.ctx.fillRect(item.pos.x, item.pos.y, item.size.x, item.size.y);
            this.ctx.strokeStyle = item.isSelected ? "#fff838" : "#1d536e";
            this.ctx.strokeRect(item.pos.x, item.pos.y, item.size.x, item.size.y);
            this.ctx.drawImage(
                item.sprite.img,
                item.sprite.imgX,
                item.sprite.imgY,
                item.sprite.imgW,
                item.sprite.imgH,
                item.pos.x + 25,
                item.pos.y - 50,
                200, 200
            );

            this.ctx.fillStyle = "Black";
            this.ctx.fillText(item.key, item.pos.x + 10, item.pos.y + 30);
        }

        this.ctx.lineWidth = 1;
    }

    getSelectedBtnSprite() {
        for (let i = 0; i < this.hudBtns.length; i++) {
            if (this.hudBtns[i].isSelected){
                return this.hudBtns[i].sprite.info;
            }
        }

    }

    setSelectedKey(key){
        switch(key){
            case '1':
            case '2':
            case '3':
                this.setSelectedBtn(key)
                break;
        }
    }

    setSelectedBtn(selectedKey){
        for (let i = 0; i < this.hudBtns.length; i++) {
            this.hudBtns[i].isSelected = false;
        }

        this.hudBtns[selectedKey - 1].isSelected = true;
    }

    checkMouseInteraction(mouse) {
        for (let i = 0; i < this.hudBtns.length; i++) {
            const pos = this.hudBtns[i].pos;
            const size = this.hudBtns[i].size;
            if (mouse.x > pos.x && mouse.x < (pos.x + size.x)){
                if (mouse.y > pos.y && mouse.y < (pos.y + size.y)){
                    this.setSelectedKey(`${i + 1}`);
                }
            }
        }

    }
}

class HudItem {
    constructor(key, mainHud, pos, sprite) {
        this.key = key;

        this.pos = new Coordinates(pos, 645);
        this.size = mainHud.hudSize;
        this.sprite = new Sprite(sprite);
        this.isSelected = false;
    }

}