import { Coordinates } from "../coordinates.js";
import { Sprite } from "../sprite/sprite.js";
import CubeSheet from "../../assets/mapSheet.json" assert {type: 'json'};

const bigFont = "30px Oswald";
const smallFont = "20px Oswald";
export class Hud {

    constructor(canvas, ctx, game, keyboard) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.game = game;
        this.keyboard = keyboard;

        this.hudBtns = [];
        this.selectedBtn = 1;
        this.sideButtons = [
            new Button("Pay $10", 650, 230, 140, 40),
            new Button("Speed up", 650, 280, 140, 40),
            new Button("", 8, 100, 80, 270)]

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
        this.drawBuyButtons();
        this.drawSideButtons();
        this.drawDemandHud();

    }

    drawDemandHud(){
        this.ctx.font = smallFont;
        const offsetX = -410;
        const offsetY = 55;

        this.ctx.fillText(`${this.game.printerDemand}`, offsetX + 470, offsetY + 80);
        this.ctx.drawImage(
            this.printerSprite.img,
            this.printerSprite.imgX,
            this.printerSprite.imgY,
            this.printerSprite.imgW,
            this.printerSprite.imgH,
            offsetX + 420, offsetY + 40,
            48, 48 ,
        );

        this.ctx.fillText(`+`, offsetX + 425, offsetY + 100);
        this.ctx.fillText(`${this.game.workerDemand}`, offsetX + 470, offsetY + 115);
        this.ctx.drawImage(
            this.workerSprite.img,
            this.workerSprite.imgX,
            this.workerSprite.imgY,
            this.workerSprite.imgW,
            this.workerSprite.imgH,
            offsetX + 420, offsetY + 75,
            56, 56
        );

        this.ctx.fillText(`+`, offsetX + 425, offsetY + 135);
        this.ctx.fillText(`${this.game.phoneDemand}`, offsetX + 470, offsetY + 150);
        this.ctx.drawImage(
            this.phoneSprite.img,
            this.phoneSprite.imgX,
            this.phoneSprite.imgY,
            this.phoneSprite.imgW,
            this.phoneSprite.imgH,
            offsetX + 420, offsetY + 105,
            56, 56
        );


        this.ctx.fillText(`=`, offsetX + 450, offsetY + 175);
        this.ctx.drawImage(
            this.documentSprite.img,
            this.documentSprite.imgX,
            this.documentSprite.imgY,
            this.documentSprite.imgW,
            this.documentSprite.imgH,
            offsetX + 425, offsetY + 165,
            64, 64
        );
        this.ctx.fillText(`+`, offsetX + 430, offsetY + 230);
        this.ctx.drawImage(
            this.workerSprite.img,
            this.workerSprite.imgX,
            this.workerSprite.imgY,
            this.workerSprite.imgW,
            this.workerSprite.imgH,
            offsetX + 430, offsetY + 205,
            64, 64
        );

        this.ctx.fillText(`=`, offsetX + 450, offsetY + 275);
        this.ctx.drawImage(
            this.coinSprite.img,
            this.coinSprite.imgX,
            this.coinSprite.imgY,
            this.coinSprite.imgW,
            this.coinSprite.imgH,
            offsetX + 440, offsetY + 275,
            32, 32
        );

    }

    drawSideButtons() {
        for (let i = 0; i < this.sideButtons.length; i++) {
            this._drawBtn(this.sideButtons[i]);
        }

    }

    drawHud() {
        this.ctx.font = bigFont;
        this.ctx.fillStyle = "4b94b9";

        this.drawDeals();
        this.drawPrinters();
        this.drawPhones();
        this.drawWorkers();
        this.drawWallet();
        this.drawStopwatch();
        this.drawFloors();

    }

    drawWallet() {
        this.ctx.font = bigFont;
        this.ctx.fillText(this.game.wallet, 720, 165);
        this.ctx.font = smallFont;
        const toDisplay = this.game.paidFloor ? `Paid $${this.game.getFloorCost()}` : `Floor cost: $${this.game.getFloorCost()}`
        this.ctx.fillText(toDisplay, 650, 210);
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

    drawFloors() {
        this.ctx.font = bigFont;
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
        this.ctx.font = bigFont;
        this.ctx.fillText(this.game.totalWorkers, 210, 50);

        this.ctx.font = smallFont;
        this.ctx.fillText(`+${this.game.worker}/s`, 220, 70);
        this.ctx.drawImage(
            this.workerSprite.img,
            this.workerSprite.imgX,
            this.workerSprite.imgY,
            this.workerSprite.imgW,
            this.workerSprite.imgH,
            118, -22,
            96, 96
        );
    }

    drawPhones() {
        this.ctx.font = bigFont;
        this.ctx.fillText(this.game.totalPhones, 335, 50);

        this.ctx.font = smallFont;
        this.ctx.fillText(`+${this.game.phone}/s`, 345, 70);
        this.ctx.drawImage(
            this.phoneSprite.img,
            this.phoneSprite.imgX,
            this.phoneSprite.imgY,
            this.phoneSprite.imgW,
            this.phoneSprite.imgH,
            256, -28,
            96, 96
        );
    }

    drawPrinters() {
        this.ctx.font = bigFont;
        this.ctx.fillText(`${this.game.totalPrinters}`, 80, 50);

        this.ctx.font = smallFont;
        this.ctx.fillText(`+${this.game.printer}/s`, 90, 70);
        this.ctx.drawImage(
            this.printerSprite.img,
            this.printerSprite.imgX,
            this.printerSprite.imgY,
            this.printerSprite.imgW,
            this.printerSprite.imgH,
            -10, -28,
            96, 96
        );
    }

    drawDeals() {
        this.ctx.font = bigFont;
        this.ctx.fillText(`${this.game.finishedDeals}`, 480, 45);
        this.ctx.drawImage(
            this.documentSprite.img,
            this.documentSprite.imgX,
            this.documentSprite.imgY,
            this.documentSprite.imgW,
            this.documentSprite.imgH,
            420, 0,
            64, 64
        );

    }

    drawStopwatch() {
        this.ctx.font = bigFont;
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

    drawBuyButtons() {
        this.ctx.font = "25px Oswald";
        this.ctx.lineWidth = 5;

        for (let i = 0; i < this.hudBtns.length; i++) {
            const item = this.hudBtns[i];
            //
            this.ctx.fillStyle = "#4b94b9";
            this.ctx.fillRect(item.pos.x, item.pos.y, item.size.x, item.size.y);
            this.ctx.strokeStyle = item.isSelected ? "#fff838" : "#1d536e";
            this.ctx.strokeRect(item.pos.x, item.pos.y, item.size.x, item.size.y);
            // Main img
            this.ctx.drawImage(
                item.sprite.img,
                item.sprite.imgX,
                item.sprite.imgY,
                item.sprite.imgW,
                item.sprite.imgH,
                item.pos.x + 15,
                item.pos.y - 55,
                200, 200
            );
            //Price img
            this.ctx.drawImage(
                this.coinSprite.img,
                this.coinSprite.imgX,
                this.coinSprite.imgY,
                this.coinSprite.imgW,
                this.coinSprite.imgH,
                item.pos.x + item.size.x - 70,
                item.pos.y + 5,
                32, 32
            );

            this.ctx.fillStyle = "Black";
            this.ctx.fillText(item.key, item.pos.x + 10, item.pos.y + 30);
            this.ctx.fillText(this.game.getItemCost(), item.pos.x + item.size.x - 35, item.pos.y + 30);
        }

        this.ctx.lineWidth = 1;
    }

    getSelectedBtnSprite() {
        for (let i = 0; i < this.hudBtns.length; i++) {
            if (this.hudBtns[i].isSelected) {
                return this.hudBtns[i].sprite.info;
            }
        }

    }

    setSelectedKey(key) {
        switch (key) {
            case '1':
            case '2':
            case '3':
                this.setSelectedBtn(key)
                break;
        }
    }

    setSelectedBtn(selectedKey) {
        for (let i = 0; i < this.hudBtns.length; i++) {
            this.hudBtns[i].isSelected = false;
        }

        this.hudBtns[selectedKey - 1].isSelected = true;
    }

    checkMouseInteraction(mouse) {
        for (let i = 0; i < this.hudBtns.length; i++) {
            const pos = this.hudBtns[i].pos;
            const size = this.hudBtns[i].size;
            if (mouse.x > pos.x && mouse.x < (pos.x + size.x)) {
                if (mouse.y > pos.y && mouse.y < (pos.y + size.y)) {
                    this.setSelectedKey(`${i + 1}`);
                }
            }
        }

        if (this.sideButtons[0].interacted(mouse)) {
            this.game.buyFloor();
        }

        if (this.sideButtons[1].interacted(mouse)) {
            this.game.speedUp();
        }


    }

    _drawBtn(btn) {
        this.ctx.fillStyle = "#4b94b9";
        this.ctx.fillRect(btn.pos.x, btn.pos.y, btn.size.x, btn.size.y);
        this.ctx.strokeStyle = "#1d536e";
        this.ctx.strokeRect(btn.pos.x, btn.pos.y, btn.size.x, btn.size.y);
        this.ctx.fillStyle = "black";
        this.ctx.fillText(btn.text, btn.pos.x + 10, btn.pos.y + 27);
    }
}

class Button {
    constructor(text, x, y, width, height) {
        this.text = text;
        this.pos = new Coordinates(x, y);
        this.size = new Coordinates(width, height);
    }

    interacted(mouse) {
        if (mouse.x > this.pos.x && mouse.x < (this.pos.x + this.size.x)) {
            if (mouse.y > this.pos.y && mouse.y < (this.pos.y + this.size.y)) {
                return true;
            }
        }

        return false;
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