export class Game {
    constructor() {
        this.score = 0;
        this.playing = true;
        this.floors = 1;

        //Timer
        this.secondsLeft = 60;
        this.timer = undefined;
        this.resetTimer();

    }

    resetTimer() {
        this.secondsLeft = 61;
        if (this.timer){
            clearTimeout(this.timer);
        }
        this.tick();
    }

    tick() {
        if (this.secondsLeft > 1){
            this.secondsLeft--;
        } else {
            console.log("Game over");
            this.secondsLeft = 0;
            this.playing = false;
            return;
        }
        this.timer = setTimeout(() => this.tick(), 1000);
    }

}