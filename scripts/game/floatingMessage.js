export class FloatingMessage {
    constructor(ctx, x, y, value, size, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.value = value;
        this.size = size;
        this.lifespan = 0;
        this.color = color;
        this.opacity = 1;
        console.log(value);
    }
    update() {
        this.y -= 0.5;
        this.lifespan++;
        if (this.opacity > 0.1) {
            this.opacity -= 0.02;
        } else {
            this.opacity = 0;
        }
    }
    draw() {
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fillStyle = this.color;
        this.ctx.font = this.size + 'px Oswald';
        this.ctx.fillText(this.value, this.x, this.y);

        //reset opacity
        this.ctx.globalAlpha = 1;
    }
}

//floatingMessages.push(new FloatingMessage(ctx, mouse.x, mouse.y, '+' + powerUps[i].amount, 40, 'black'));