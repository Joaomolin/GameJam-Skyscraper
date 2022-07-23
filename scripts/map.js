import { Tile } from "./tile.js";
import MapJson from "../assets/map.json" assert {type: 'json'};
import CubeSheet from "../assets/mapSheet.json" assert {type: 'json'};
import TilesInfo from "./sprite/tiles.json" assert { type: "json" };
import IsoConfig from "../isometricConfig.json" assert { type: "json" };
import { Coordinates } from "./coordinates.js";
export class Map {
  constructor(ctx, cartCtx, isometric, selectedTile) {
    this.isoCtx = ctx;
    this.cartCtx = cartCtx;
    this.cartTileSize = 132;
    this.iso = isometric;
    this.selectedTile = selectedTile;
    this.floor = [];
    this.objects = [];
    this.building = [];
    this.playerTile = isometric.player.pos;
    this.player = isometric.player;

    this.createCubeFloor();
    this.createCubeObjects();
    this.createBuilding();
  }

  mapJsonToArray(layer) {
    const mapJson = MapJson.layers[layer];
    const newMap = []

    for (let i = 0; i < mapJson.height; i++) {
      let arr = [];
      for (let j = 0; j < mapJson.width; j++) {
        arr.push(mapJson.data.pop());
      }
      newMap.push(arr.reverse());
    }

    return newMap.reverse();
  }

  getCubesInfo(num){
    let infoToSend;

    switch (num - 1) {
      case 0: infoToSend = CubeSheet.Grass; break;
      case 9: infoToSend = CubeSheet.SkyScrapper; break;
      case 15: infoToSend = CubeSheet.Tree; break;
      case 16: infoToSend = CubeSheet.Sidewalk; break;

      case 6: infoToSend = CubeSheet.RoadCrossroad; break;
      case 8: infoToSend = CubeSheet.RoadEW; break;
      case 18: infoToSend = CubeSheet.RoadNS; break;
      default: infoToSend = TilesInfo.Invisible; break;
    }

    return infoToSend;
  }

  createBuilding() {
    const newMap = this.mapJsonToArray(2);

    for (let y = 0; y < newMap.length; y++) {
      let arr = [];
      for (let x = 0; x < newMap[y].length; x++) {
        let infoToSend = this.getCubesInfo(newMap[y][x]);
        arr.push(new Tile(new Coordinates(x, y), infoToSend));
      }

      this.building.push(arr);
    }
  }

  createCubeObjects() {
    const newMap = this.mapJsonToArray(1);

    for (let y = 0; y < newMap.length; y++) {
      let arr = [];
      for (let x = 0; x < newMap[y].length; x++) {
        let infoToSend = this.getCubesInfo(newMap[y][x]);
        arr.push(new Tile(new Coordinates(x, y), infoToSend));
      }

      this.objects.push(arr);
    }
  }

  createCubeFloor() {
    const newMap = this.mapJsonToArray(0);

    for (let y = 0; y < newMap.length; y++) {
      let arr = [];
      for (let x = 0; x < newMap[y].length; x++) {
        let infoToSend = this.getCubesInfo(newMap[y][x]);
        arr.push(new Tile(new Coordinates(x, y), infoToSend));
      }

      this.floor.push(arr);
    }
  }




  //Cart
  printCartFloor() {
    this.cartCtx.clearRect(0, 0, 10000, 10000);
    this.cartCtx.lineWidth = 3;

    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        this.printCartFloorTile(x, y);
      }
    }
  }

  printCartFloorTile(x, y) {
    const xCoord = 6 + (x - 1);
    const yCoord = 6 + (y - 1);
    if (xCoord >= 0 && yCoord >= 0 && xCoord < this.floor[y].length && yCoord < this.floor.length) {
      const tile = this.floor[yCoord][xCoord];

      this.cartCtx.fillStyle = tile.color;

      this.cartCtx.fillRect(
        x * this.cartTileSize + 3,
        y * this.cartTileSize + 3,
        this.cartTileSize,
        this.cartTileSize
      );

      this.cartCtx.strokeRect(
        x * this.cartTileSize + 3,
        y * this.cartTileSize + 3,
        this.cartTileSize,
        this.cartTileSize
      );

      this.cartCtx.fillStyle = 'black'
      this.cartCtx.fillText(`${xCoord}, ${yCoord}`, 10 + (x * this.cartTileSize), this.cartTileSize - 5 + (y * this.cartTileSize), this.cartTileSize, this.cartTileSize);

    }
  }

  //Iso
  printIsoFloor() {
    this.isoCtx.clearRect(0, 0, 10000, 10000);
    const floors = 2;

    for (let y = 0; y < this.floor.length; y++) {
      for (let x = 0; x < this.floor[y].length; x++) {
        this.printIsoFloorTile(this.floor[x][y], floors);
      }
    }

    for (let y = 0; y < this.objects.length; y++) {
      for (let x = 0; x < this.objects[y].length; x++) {
        this.printFloorObject(this.objects[x][y], floors + 1);
      }
    }

    for (let z = floors; z >= 1; z--){
      for (let y = 0; y < this.building.length; y++) {
        for (let x = 0; x < this.building[y].length; x++) {
          this.printIsoFloorTile(this.building[x][y], z);
        }
      }
    }
    
  }

  printIsoFloorTile(tile, layer) {

    const tileX = this.iso.IsoToScreenX(
      tile.coordinates.x - 1,
      tile.coordinates.y
    );
    const tileY = this.iso.IsoToScreenY(tile.coordinates.x, tile.coordinates.y);

    this.isoCtx.drawImage(
      tile.sprite.img,
      tile.sprite.imgX,
      tile.sprite.imgY,
      tile.sprite.imgW - 0.2,
      tile.sprite.imgH - 0.2,
      tileX,
      tileY + (layer * IsoConfig.cellHeight * 2),
      IsoConfig.cellWidth * 2.05,
      IsoConfig.cellHeight * 4.05
    );
  }

  //Floor objects
  printFloorObject(tile, layer) {

    const tileX = this.iso.IsoToScreenX(
      tile.coordinates.x - 2,
      tile.coordinates.y - 1
    );
    const tileY = this.iso.IsoToScreenY(tile.coordinates.x - 1, tile.coordinates.y - 1);

    this.isoCtx.drawImage(
      tile.sprite.img,
      tile.sprite.imgX,
      tile.sprite.imgY,
      tile.sprite.imgW,
      tile.sprite.imgH,
      tileX,
      tileY + (layer * IsoConfig.cellHeight * 2),
      IsoConfig.cellWidth * 2.05,
      IsoConfig.cellHeight * 4.05
    );
  }

  //
  printMap() {
  
    this.printIsoFloor();
    this.printCartFloor();
  }

}
