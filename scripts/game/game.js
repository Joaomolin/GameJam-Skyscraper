import { FloatingMessage } from "./floatingMessage.js";

export class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.score = 0;
        this.playing = false;
        this.floors = 2;
        this.paidFloor = false;
        this.floatingMessages = [];
        this.dragMouse = false;

        //Timer
        this.normalTick = 1000;
        this.tickTime = this.normalTick;
        this.secondsLeft = 60;
        this.timer = undefined;
        this.restartTimer();


        //
        this.printer = 5;
        this.totalPrinters = 0;
        this.printerDemand = 5;
        this.phone = 5;
        this.totalPhones = 0;
        this.phoneDemand = 5;
        this.worker = 5;
        this.totalWorkers = 0;
        this.workerDemand = 5;
        //
        this.wallet = 25;
        this.finishedDeals = 0;
        this.floorPrice = 10;

    }

    restartTimer() {
        this.secondsLeft = 61;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.tick();
    }

    speedUp(){
        this.normalTick = this.normalTick === 1000 ? 250 : 1000;
        this.tickTime = this.normalTick;

        console.log(this.normalTick)
    }

    nextFloor() {
        if (this.floors < 10) {
            this.floorPrice = this.floorPrice * 1.4;
        } else if (this.floors < 20) {
            this.floorPrice = this.floorPrice * 1.3;
        } else {
            this.floorPrice = this.floorPrice * 1.15;
        }

        this.tickTime = this.normalTick;
        this.floors++;
        this.restartTimer();
    }

    buyFloor() {
        if (!this.paidFloor) {
            const cost = this.getFloorCost();
            if (this.wallet >= cost) {
                this.wallet -= cost;
                this.paidFloor = true;
            }
        }
    }

    tick() {
        if (this.secondsLeft > 0) {
            this.secondsLeft--;
        } else {
            this.secondsLeft = 0;
            return;
        }

        this.totalPrinters += this.printer;
        this.totalPhones += this.phone;
        this.totalWorkers += this.worker;

        let popUpFinishedWorks = 0;
        let popUpFinishedDeals = 0;
        this.updateDemand();
        for (let i = 0; i < this.worker; i++) {
            if (Math.random() > 0.5) {
                if (this.finishedDeals > 0) {
                    this.finishedDeals--;
                    this.wallet++;
                    popUpFinishedWorks++;
                    continue;
                }
            }
            if (this.hasResources()) {
                this.payResources();
                this.finishedDeals += 1;
                popUpFinishedDeals++;
            }
        }
        if (popUpFinishedWorks >= popUpFinishedDeals) {
            if (popUpFinishedWorks >= 1) {
                this.floatingMessages.push(new FloatingMessage(this.ctx, 525, 50, '+' + popUpFinishedWorks, 30, 'black'));
                this.floatingMessages.push(new FloatingMessage(this.ctx, 620, 165, '+' + popUpFinishedWorks, 30, 'black'));
            }
        } else {
            if (popUpFinishedWorks >= 1) {
                this.floatingMessages.push(new FloatingMessage(this.ctx, 525, 50, '+' + (popUpFinishedDeals - popUpFinishedWorks), 30, 'black'));
                this.floatingMessages.push(new FloatingMessage(this.ctx, 620, 165, '+' + popUpFinishedWorks, 30, 'black'));
            }
        }

        // this.floatingMessages.push(new FloatingMessage(this.ctx, 520, 50, '-' + popUpFinishedWorks, 30, 'black'));
        this.timer = setTimeout(() => this.tick(), this.tickTime);
    }

    hasResources() {
        return this.totalPrinters >= this.printerDemand && this.totalPhones >= this.phoneDemand && this.totalWorkers >= this.workerDemand;
    }

    payResources() {
        this.totalPrinters -= this.printerDemand;
        this.totalPhones -= this.phoneDemand;
        this.totalWorkers -= this.workerDemand;
    }

    updateDemand() {
        switch (Math.random().toFixed(1)) {
            case '0.1':
            case '0.2':
                this.printerDemand = this._randomIntFromInterval(Math.max(3, this.printerDemand - 1), Math.min(8, this.printerDemand + 1));
                break;
            case '0.3':
            case '0.4':
                this.phoneDemand = this._randomIntFromInterval(Math.max(3, this.phoneDemand - 1), Math.min(8, this.phoneDemand + 1));
                break;
            case '0.5':
            case '0.6':
                this.workerDemand = this._randomIntFromInterval(Math.max(2, this.workerDemand - 1), Math.min(4, this.workerDemand + 1));
                break;

        }


    }

    updateInfo(arr) {
        arr.push(`Score: ${this.score}`);
        arr.push(`Playing: ${this.playing}`);
        // arr.push(`Floors: ${this.floors}`);
        // arr.push(`Sec left: ${this.secondsLeft}`);
        // arr.push(`Demand: ${this.printerDemand} / ${this.phoneDemand} / ${this.workerDemand}`);
        arr.push(`Floor cost: ${this.getFloorCost()}`)
        arr.push(`Paid floor: ${this.paidFloor}`)


        // arr.push(`Printer: ${this.printer}`);
        // arr.push(`TotalPrinters: ${this.totalPrinters}`);
        // arr.push(`Phone: ${this.phone}`);
        // arr.push(`TotalPhones: ${this.totalPhones}`);
        // arr.push(`Worker: ${this.worker}`);
        // arr.push(`TotalWorkers: ${this.totalWorkers}`);
        // arr.push(`Deals: ${this.finishedDeals}`);

    }

    getFloorCost() {
        return Math.floor(this.floorPrice);
    }

    getItemCost() {
        return Math.floor(this.floors * 0.5) + 8;
    }

    _randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}