export class Game {
    constructor() {
        this.score = 0;
        this.playing = false;
        this.floors = 6;
        this.paidFloor = true;

        //Timer
        this.secondsLeft = 60;
        this.timer = undefined;
        this.restartTimer();
        this.normalTick = 300;
        this.tickTime = this.normalTick;

        //
        this.printer = 20;
        this.totalPrinters = 0;
        this.printerDemand = 5;
        this.phone = 20;
        this.totalPhones = 0;
        this.phoneDemand = 5;
        this.worker = 10;
        this.totalWorkers = 0;
        this.workerDemand = 5;
        //
        this.wallet = 10;
        this.finishedDeals = 0;
        this.floorPrice = 64;

    }

    restartTimer() {
        this.secondsLeft = 61;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.tick();
    }

    nextFloor() {
        if (this.floors < 10){
            this.floorPrice = this.floorPrice * 1.35;
        } else if (this.floors < 20){
            this.floorPrice = this.floorPrice * 1.20;
        } else {
            this.floorPrice = this.floorPrice * 1.15;
        }

        this.tickTime = this.normalTick;
        this.floors++;
        this.restartTimer();
    }

    tick() {
        if (this.secondsLeft > 1) {
            this.secondsLeft--;
        } else {
            this.secondsLeft = 0;
            return;
        }

        this.totalPrinters += this.printer;
        this.totalPhones += this.phone;
        this.totalWorkers += this.worker;

        this.updateDemand();
        for (let i = 0; i < this.worker; i++) {
            if (Math.random() > 0.5) {
                if (this.finishedDeals > 0) {
                    this.finishedDeals--;
                    this.wallet++;
                    continue;
                }
            }
            if (this.hasResources()) {
                this.payResources();
                this.finishedDeals += 1;
            }
        }

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

    _randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}