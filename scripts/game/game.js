export class Game {
    constructor() {
        this.score = 0;
        this.playing = true;
        this.floors = 1;

        //Timer
        this.secondsLeft = 60;
        this.timer = undefined;
        this.resetTimer();

        //
        this.printer = 0;
        this.totalPrinters = 0;
        this.phone = 0;
        this.totalPhones = 0;
        this.worker = 0;
        this.totalWorkers = 0;
        this.finishedDeals = 0;

    }

    resetTimer() {
        this.secondsLeft = 61;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.tick();
    }

    tick() {
        if (this.secondsLeft > 1) {
            this.secondsLeft--;
        } else {
            console.log("Game over");
            this.secondsLeft = 0;
            this.playing = false;
            return;
        }

        this.totalPrinters += this.printer;
        this.totalPhones += this.phone;
        this.totalWorkers += this.worker;

        for(let i = 0; i < this.worker; i++){
            if (this.totalPrinters > 5 && this.totalPhones > 5 && this.totalWorkers > 5){
                this.totalPrinters -= 5;
                this.totalPhones -= 5;
                this.totalWorkers -= 5;
    
                this.finishedDeals += 1;
            }
        }

        this.timer = setTimeout(() => this.tick(), 1000);
    }

    updateInfo(arr) {
        arr.push(`Score: ${this.score}`);
        arr.push(`Playing: ${this.playing}`);
        arr.push(`Floors: ${this.floors}`);
        arr.push(`Sec left: ${this.secondsLeft}`);
        

        // arr.push(`Printer: ${this.printer}`);
        // arr.push(`TotalPrinters: ${this.totalPrinters}`);
        // arr.push(`Phone: ${this.phone}`);
        // arr.push(`TotalPhones: ${this.totalPhones}`);
        // arr.push(`Worker: ${this.worker}`);
        // arr.push(`TotalWorkers: ${this.totalWorkers}`);
        // arr.push(`Deals: ${this.finishedDeals}`);

    }
}