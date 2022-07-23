export class DebugOptions {
  constructor(ctx, isometric) {
    this.ctx = ctx;
    this.iso = isometric;

    this.printCoordinates = false;
    this.printCameraBorder = false;
  }


  printDebugGrid(rx, ry, gridFirstTile, gridLastTile, floorX, floorY, canvas) {
    // this.printGridLines(gridFirstTile, gridLastTile);
    if (this.printCoordinates){
        this.printGridCoordinates(gridFirstTile, gridLastTile);
    }


    this.strokeSelectedTile(floorX, floorY);
    
    this.printXAxisDividedLine(rx, ry, gridFirstTile, gridLastTile, floorX, floorY);
    this.printYAxisDividedLine(rx, ry, gridFirstTile, gridLastTile, floorX, floorY);

    // this.printYAxisLine(rx, ry, gridFirstTile, gridLastTile);
    // this.printXAxisLine(rx, ry, gridFirstTile, gridLastTile);

    if (this.printCameraBorder){
      this.printBorder(canvas);
    }
    
  }
  printBorder(canvas){
      this.ctx.fillStyle = "111";
      this.ctx.globalAlpha = 0.2;
      this.ctx.fillRect(0, 0, canvas.width / 8, canvas.height);
      this.ctx.fillRect(canvas.width - (canvas.width / 8), 0, canvas.width / 8, canvas.height);
      this.ctx.fillRect(0, 0, canvas.width, canvas.height / 5);
      this.ctx.fillRect(0, canvas.height - (canvas.height / 5), canvas.width, canvas.height / 5);
      this.ctx.globalAlpha = 1;
  }


  strokeSelectedTile(floorX, floorY){
    
    this.ctx.strokeStyle = "yellow";
    this.ctx.beginPath();
    this.ctx.moveTo(this.iso.IsoToScreenX(floorX, floorY), this.iso.IsoToScreenY(floorX, floorY));
    this.ctx.lineTo(
    this.iso.IsoToScreenX(floorX + 1, floorY),
    this.iso.IsoToScreenY(floorX + 1, floorY)
  );
  this.ctx.lineTo(
    this.iso.IsoToScreenX(floorX + 1, floorY + 1),
    this.iso.IsoToScreenY(floorX + 1, floorY + 1)
  );
  this.ctx.lineTo(
    this.iso.IsoToScreenX(floorX, floorY + 1),
    this.iso.IsoToScreenY(floorX, floorY + 1)
  );
  this.ctx.closePath();
  this.ctx.stroke();

  }
  printGridLines(gridFirstTile, gridLastTile) {
    this.ctx.strokeStyle = "#aaa";
    for (var i = gridFirstTile; i <= gridLastTile; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(
        this.iso.IsoToScreenX(gridFirstTile, i),
        this.iso.IsoToScreenY(gridFirstTile, i)
      );
      this.ctx.lineTo(
        this.iso.IsoToScreenX(gridLastTile, i),
        this.iso.IsoToScreenY(gridLastTile, i)
      );
      this.ctx.moveTo(
        this.iso.IsoToScreenX(i, gridFirstTile),
        this.iso.IsoToScreenY(i, gridFirstTile)
      );
      this.ctx.lineTo(
        this.iso.IsoToScreenX(i, gridLastTile),
        this.iso.IsoToScreenY(i, gridLastTile)
      );
      this.ctx.closePath();
      this.ctx.stroke();
    }

  }
  printGridCoordinates(gridFirstTile, gridLastTile) {
    this.ctx.font = "10px sans-serif";
    this.ctx.textAlign = "center";
    for (var x = gridFirstTile; x < gridLastTile; x++) {
      for (var y = gridFirstTile; y < gridLastTile; y++) {
        this.ctx.fillText(
          `${x}, ${y}`,
          this.iso.IsoToScreenX(x, y),
          this.iso.IsoToScreenY(x, y) + this.iso.IsoH + 5
        );
      }
    }
  }

  printXAxisDividedLine(rx, ry, gridFirstTile, gridLastTile, floorX, floorY){
    //First X half line first
    this.ctx.strokeStyle = "blue";
    this.ctx.beginPath();
    this.ctx.moveTo(this.iso.IsoToScreenX(rx, gridFirstTile), this.iso.IsoToScreenY(rx, gridFirstTile));
    this.ctx.lineTo(this.iso.IsoToScreenX(rx, floorY), this.iso.IsoToScreenY(rx, floorY));
    this.ctx.stroke();
    //second half
    this.ctx.beginPath();
    this.ctx.moveTo(this.iso.IsoToScreenX(rx, floorY + 1), this.iso.IsoToScreenY(rx, floorY + 1));
    this.ctx.lineTo(this.iso.IsoToScreenX(rx, gridLastTile), this.iso.IsoToScreenY(rx, gridLastTile));
    this.ctx.stroke();
  }
  printYAxisDividedLine(rx, ry, gridFirstTile, gridLastTile, floorX, floorY){
    //First Y half line first
    this.ctx.strokeStyle = "red";
    this.ctx.beginPath();
    this.ctx.moveTo(this.iso.IsoToScreenX(gridFirstTile, ry), this.iso.IsoToScreenY(gridFirstTile, ry));
    this.ctx.lineTo(this.iso.IsoToScreenX(floorX, ry), this.iso.IsoToScreenY(floorX, ry));
    this.ctx.stroke();
    //second half
    this.ctx.beginPath();
    this.ctx.moveTo(this.iso.IsoToScreenX(floorX + 1, ry), this.iso.IsoToScreenY(floorX + 1, ry));
    this.ctx.lineTo(this.iso.IsoToScreenX(gridLastTile, ry), this.iso.IsoToScreenY(gridLastTile, ry));
    this.ctx.stroke();
  }
  printXAxisLine(rx, ry, gridFirstTile, gridLastTile) {
    this.ctx.strokeStyle = "blue";
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.iso.IsoToScreenX(rx, gridFirstTile),
      this.iso.IsoToScreenY(rx, gridFirstTile)
    );
    this.ctx.lineTo(
      this.iso.IsoToScreenX(rx, gridLastTile),
      this.iso.IsoToScreenY(rx, gridLastTile)
    );
    this.ctx.stroke();
  }
  printYAxisLine(rx, ry, gridFirstTile, gridLastTile) {
    this.ctx.strokeStyle = "red";
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.iso.IsoToScreenX(gridFirstTile, ry),
      this.iso.IsoToScreenY(gridFirstTile, ry)
    );
    this.ctx.lineTo(
      this.iso.IsoToScreenX(gridLastTile, ry),
      this.iso.IsoToScreenY(gridLastTile, ry)
    );
    this.ctx.stroke();
  }
}
