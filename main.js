import { Isometric } from "./scripts/isometric.js";
import { DebugOptions } from "./scripts/debugOptions.js";
import { Coordinates } from "./scripts/coordinates.js";
import { Map } from "./scripts/map.js";
import { Player } from "./scripts/player.js";
import { Tile } from "./scripts/tile.js";
import IsoConfig from "./isometricConfig.json" assert { type: "json" };
import SkeletonInfo from "./scripts/sprite/skeleton.json" assert {type: 'json'};
import { Keyboard } from "./scripts/keyboard.js";
import { Skyscraper } from "./scripts/game/skyscraper.js";
import { Game } from "./scripts/game/game.js";
import { Hud } from "./scripts/game/hud.js";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cartCanvas = document.getElementById("cartesian");
var cartCtx = cartCanvas.getContext("2d");
var runCanvas = true;
let shouldPrintInfo = true;
let printMouseCoordinates = false;
let infoArr = ["Debug =D"];
class SelectedTile {
  constructor() {
    this.coord = new Coordinates();
    this.spriteInfo = new Tile(this.coord, SkeletonInfo.Sheet.S);
  }
}
const selectedTile = new SelectedTile();
const mouseGrid = new Coordinates();
const mouse = new Coordinates(canvas.width / 2, canvas.height / 2);

const keyboard = new Keyboard();
const player = new Player(keyboard);

const isometric = new Isometric(mouse, player);
const debugGrid = new DebugOptions(ctx, isometric);

const game = new Game();
const hud = new Hud(canvas, ctx, game, keyboard);
const map = new Map(ctx, cartCtx, isometric, selectedTile, game);
const skyscraper = new Skyscraper(map, game, hud, keyboard);

//Cart
function runFrame() {
  ctx.clearRect(0, 0, 10000, 10000);

  skyscraper.drawClouds();
  skyscraper.updateFloor();
  map.draw();
  printMouseTile();


  updateInfo();
  printInfo();
  hud.draw();


  if (runCanvas) {
    requestAnimationFrame(runFrame);
  }
}

canvas.onmousemove = function (e) {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
};

canvas.addEventListener('mousemove', function (e) {
  printMouseCoordinates = true;
  if (!runCanvas) {
    runCanvas = true;
    runFrame();
  }
});

canvas.addEventListener('mouseleave', function (e) {
  printMouseCoordinates = false;
  mouse.x = 400;
  mouse.y = 200;
});

function printMouseTile() {

  var rx = Math.max(IsoConfig.gridStartAt, Math.min(isometric.ScreenToIsoX(mouse.x, mouse.y), IsoConfig.gridEndAt));
  var ry = Math.max(IsoConfig.gridStartAt, Math.min(isometric.ScreenToIsoY(mouse.x, mouse.y), IsoConfig.gridEndAt));
  mouseGrid.x = Math.floor(isometric.ScreenToIsoX(mouse.x, mouse.y));
  mouseGrid.y = Math.floor(isometric.ScreenToIsoY(mouse.x, mouse.y));
  const floorX = Math.min(Math.floor(rx), IsoConfig.gridEndAt - 1);
  const floorY = Math.min(Math.floor(ry), IsoConfig.gridEndAt - 1);

  selectedTile.coord.x = floorX;
  selectedTile.coord.y = floorY;

  if (printMouseCoordinates) {
    debugGrid.printDebugGrid(rx, ry, IsoConfig.gridStartAt, IsoConfig.gridEndAt, floorX, floorY, canvas);
  }

}

function updateInfo() {
  infoArr.length = 0;
  infoArr.push(`Mouse: ${mouse.getInString()}`);
  // infoArr.push(`Mouse grid: ${mouseGrid.getInString()}`);
  // infoArr.push(`Mouse on grid: ${selectedTile.coord.getInString()}`);
  // infoArr.push(`Player: ${player.pos.getInString()} / ${player.dir}`);
  // infoArr.push(`Cam: ${isometric.camera.getInString()}`);
  game.updateInfo(infoArr);
}

function printInfo() {
  if (!shouldPrintInfo) return;
  ctx.font = "20px open-sans";
  ctx.textAlign = 'left';
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black'
  ctx.globalAlpha = 0.8;

  ctx.strokeRect(0, 100, 200, infoArr.length * 21);
  ctx.fillRect(0, 100, 200, infoArr.length * 21);

  //Text
  ctx.fillStyle = "black";
  ctx.globalAlpha = 1;
  for (var i = 0; i < infoArr.length; i++) {
    if (infoArr[i]) {
      ctx.fillText(infoArr[i], 10, 120 + i * 20);
    }

  }
}

runFrame();

canvas.addEventListener('mousemove', function (e) {
  if (selectedTile.coord.x === mouseGrid.x && selectedTile.coord.y === mouseGrid.y) {
    skyscraper.upgradeTile();
  } else {
    hud.checkMouseInteraction(mouse);
  }
});

document.addEventListener('keyup', function (e) {
  hud.setSelectedKey(e.key);
  // keyboard.keyUp(e.key);
});

document.addEventListener('keydown', function (e) {
  // keyboard.keyDown(e.key);
});

window.addEventListener('wheel', function (e) {
  if (e.deltaY < 0) {
    skyscraper.goToNextFloor();
  }
  if (e.deltaY > 0) {
    if (game.floors > 1) {
      game.floors--;
    }
  }
});
