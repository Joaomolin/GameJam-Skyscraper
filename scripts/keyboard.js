export class Keyboard {
    constructor(){

        //Player
        this.isRunning = false;
        this.walkNorth = false;
        this.walkSouth = false;
        this.walkEast = false;
        this.walkWest = false;

        //
        this.snapCameraToPlayer = false;
    }

    keyUp(key){
        switch(key){
            case 'w':
            case 'W':
                this.walkNorth = false;
                break;
            case 'd':
            case 'D':
                this.walkEast = false;
                break
            case 's':
            case 'S':
                this.walkSouth = false;
                break;
            case 'a':
            case 'A':
                this.walkWest = false;
                break
            case 'r':
            case 'R':
                this.isRunning = !this.isRunning;   
                break;
            case 'c':
            case 'C':
                // this.snapCameraToPlayer = !this.snapCameraToPlayer;
                break;
        }
    }

    keyDown(key){
        switch(key){
            case 'w':
            case 'W':
                this.walkNorth = true;
                break;
            case 'd':
            case 'D':
                this.walkEast = true;
                break
            case 's':
            case 'S':
                this.walkSouth = true;
                break;
            case 'a':
            case 'A':
                this.walkWest = true;
                break;
        }
    }

}