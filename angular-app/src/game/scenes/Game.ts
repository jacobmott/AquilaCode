import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class GameScene extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameText: Phaser.GameObjects.Text;
  // game: Phaser.Game;
  label: Phaser.GameObjects.Text;
  pointer: Phaser.Input.Pointer;

  constructor() {
    super("Game");
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x000000);
    this.game = this.sys.game;
    // this.background = this.add.image(512, 384, 'background');
    // this.background.setAlpha(0.5);

    const map = this.add.tilemap("map1");
    const tileset: Phaser.Tilemaps.Tileset | null = map.addTilesetImage(
      "stars",
      "stars3",
    );
    let layer1: Phaser.Tilemaps.TilemapLayer;
    let layer2: Phaser.Tilemaps.TilemapLayer;
    if (tileset) {
      layer1 = map.createLayer("background", tileset, 0, 0);
      layer2 = map.createLayer("stars", tileset, 0, 0);
      // layer1.position.set(this.world.centerX, this.world.centerY);
      layer1.setPosition(this.game.canvas.width / 2, 0);
      layer2.setPosition(this.game.canvas.width / 2, 0);
    }

    let grid: Phaser.GameObjects.Grid = this.add.grid(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      this.game.canvas.width,
      this.game.canvas.height,
      32,
      32,
      0x000000,
      0,
      0xff0000,
      1,
    );
    // console.dir(map);
    this.label = this.add.text(512, 384, "(x, y)", {
      fontFamily: '"Monospace"',
    });
    this.pointer = this.input.activePointer;
    const rect1 = this.add.rectangle(10, 10, 5, 5, 0x6666ff, 1);
    // this.gameText = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
    //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
    //     stroke: '#000000', strokeThickness: 8,
    //     align: 'center'
    // }).setOrigin(0.5).setDepth(100);
    // const r1 = this.add.rectangle(200, 200, 148, 148, 0x6666ff);
    EventBus.emit("current-scene-ready", this);
  }

  changeScene() {
    this.scene.start("GameOver");
  }

  override update() {
    // this.label.setText(
    //   "(" + this.game.input + ", " + this.game.input.y + ")",
    // );
    this.label.setText("(" + this.pointer.x + ", " + this.pointer.y + ")");
  }
}
