import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game2Scene extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameText: Phaser.GameObjects.Text;
  // game: Phaser.Game;
  label: Phaser.GameObjects.Text;
  label2: Phaser.GameObjects.Text;
  pointer: Phaser.Input.Pointer;
  tileTintOrig: number = 0xffffff;
  constructor() {
    super("Game2");
  }

  editorCreate(): void {
    // iso
    const iso = this.add.tilemap("iso");
    iso.addTilesetImage("iso-64x64-building", "iso-64x64-building");
    iso.addTilesetImage("iso-64x64-outside", "iso-64x64-outside");
    iso.orientation = "isometric";

    this.iso = iso;

    // this.events.emit("scene-awake");
  }

  private iso!: Phaser.Tilemaps.Tilemap;

  private controls!: Phaser.Cameras.Controls.SmoothedKeyControl;

  create() {
    // this.game.events.addListener(
    //   Phaser.Core.Events.FOCUS,
    //   this.gainFocus,
    //   this,
    // );
    // this.game.events.addListener(Phaser.Core.Events.BLUR, this.lostFocus, this);

    this.editorCreate();

    const cursors = this.input.keyboard!.createCursorKeys();

    this.cameras.main.setZoom(0.25);
    this.cameras.main.setScroll(-200, 200);
    this.iso.createLayer("1-ground", ["iso-64x64-outside"], 0, 0);
    this.iso.createLayer(
      "2-stonebase",
      ["iso-64x64-building", "iso-64x64-outside"],
      0,
      0,
    );
    this.iso.createLayer(
      "3-wall",
      ["iso-64x64-building", "iso-64x64-outside"],
      0,
      0,
    );
    this.iso.createLayer(
      "4-roof",
      ["iso-64x64-building", "iso-64x64-outside"],
      0,
      0,
    );

    // 5_roof_1
    const roof_five_layer = this.iso.createLayer(
      "5-roof",
      ["iso-64x64-building", "iso-64x64-outside"],
      0,
      0,
    );

    const controlConfig = {
      camera: this.cameras.main,
      zoomSpeed: 0.05,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.04,
      zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      drag: 0.0005,
      maxSpeed: 0.7,
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
      controlConfig,
    );

    // let grid: Phaser.GameObjects.Grid = this.add.grid(
    //   this.game.canvas.width / 2,
    //   this.game.canvas.height / 2,
    //   this.game.canvas.width,
    //   this.game.canvas.height,
    //   64,
    //   64,
    //   0x000000,
    //   0,
    //   0xff0000,
    //   1,
    // );
    // console.dir(map);
    this.label = this.add.text(512, 384, "(x, y)", {
      fontFamily: '"Monospace"',
    });
    this.label2 = this.add.text(512, 384, "(x, y)", {
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
    this.input.on("pointerup", (pointer) => {
      // const tile = layer.getTileAtWorldXY(pointer.worldX, pointer.worldY);

      // const x = pointer.worldX;
      // const y = pointer.worldY;

      // const tileXY = layer.worldToTileXY(pointer.worldX, pointer.worldY, true);

      // const tile = layer.getTileAt(tileXY.x, tileXY.y);

      const tile = roof_five_layer.getIsoTileAtWorldXY(
        pointer.worldX,
        pointer.worldY,
        false,
      );

      if (tile) {
        tile.tint = 0xffffff;
      }

      // const tileX = layer.worldToTileX(x, true);
      // const tileY = layer.worldToTileX(y, true);
      // console.log(tileXY, tileX, tileY);
      // console.log(tileXY);
    });

    this.input.on("pointerdown", (pointer) => {
      // const tile = layer.getTileAtWorldXY(pointer.worldX, pointer.worldY);

      // const x = pointer.worldX;
      // const y = pointer.worldY;

      // const tileXY = layer.worldToTileXY(pointer.worldX, pointer.worldY, true);

      // const tile = layer.getTileAt(tileXY.x, tileXY.y);

      const tile = roof_five_layer.getIsoTileAtWorldXY(
        pointer.worldX,
        pointer.worldY,
        false,
        false,
        this.cameras.main,
      );

      if (tile) {
        // if (tile.tint !== 0xff0000) {
        //   this.tileTintOrig = tile.tint;
        // }
        tile.tint = 0xff0000;
      }

      // const tileX = layer.worldToTileX(x, true);
      // const tileY = layer.worldToTileX(y, true);
      // console.log(tileXY, tileX, tileY);
      // console.log(tileXY);
    });

    this.input.on("pointermove", (pointer) => {
      const px = Math.trunc(pointer.x);
      const py = Math.trunc(pointer.y);
      const pwx = Math.trunc(pointer.worldX);
      const pwy = Math.trunc(pointer.worldY);
      let xOffsetAmount = 40;
      let yOffsetAmount = 40;
      if (px > this.game.canvas.width / 2) {
        xOffsetAmount = -160;
      }
      if (py > this.game.canvas.height / 2) {
        yOffsetAmount = -40;
      }
      this.label.setText("world(iso)X/Y: (" + pwx + ", " + pwy + ")");
      this.label2.setText("pointerX/Y: (" + px + ", " + py + ")");
      this.label.x = pwx + xOffsetAmount;
      this.label.y = pwy + yOffsetAmount;
      this.label2.x = pwx + xOffsetAmount;
      this.label2.y = pwy + yOffsetAmount + 20;
    });

    EventBus.emit("current-scene-ready", this);
  }

  lostFocus() {
    console.log("lost focus");
    this.input.keyboard.manager.enabled = true;
  }

  gainFocus() {
    console.log("gained focus");
    this.input.keyboard.manager.enabled = false;
  }

  //   override update(time: number, delta: number) {
  //     this.controls.update(delta);

  //     const cartPoint: Phaser.Geom.Point = new Phaser.Geom.Point(
  //       this.pointer.x,
  //       this.pointer.y,
  //     );
  //     const isoPointerPoint: Phaser.Geom.Point =
  //       this.cartesianToIsometric(cartPoint);
  //     this.label.setText(
  //       "(" + isoPointerPoint.x + ", " + isoPointerPoint.y + ")",
  //     );
  //     this.label.x = isoPointerPoint.x;
  //     this.label.y = isoPointerPoint.y;
  //   }

  //   override update(time: number, delta: number) {
  //     this.controls.update(delta);
  //     Phaser.Tilemaps.Components.IsometricTileToWorldXY()

  //     const cartPoint: Phaser.Geom.Point = new Phaser.Geom.Point(
  //       this.pointer.x,
  //       this.pointer.y,
  //     );
  //     const isoPointerPoint: Phaser.Geom.Point =
  //       this.cartesianToIsometric(cartPoint);
  //     this.label.setText(
  //       "(" + isoPointerPoint.x + ", " + isoPointerPoint.y + ")",
  //     );
  //     this.label.x = isoPointerPoint.x;
  //     this.label.y = isoPointerPoint.y;
  //   }

  override update(time: number, delta: number) {
    this.controls.update(delta);
  }

  changeScene() {
    this.scene.start("GameOver");
  }

  isometricToCartesian(isoPt: Phaser.Geom.Point): Phaser.Geom.Point {
    const tempPt = new Phaser.Geom.Point();
    tempPt.x = (2 * isoPt.y + isoPt.x) / 2;
    tempPt.y = (2 * isoPt.y - isoPt.x) / 2;
    return tempPt;
  }

  cartesianToIsometric(cartPt: Phaser.Geom.Point): Phaser.Geom.Point {
    const tempPt = new Phaser.Geom.Point();
    tempPt.x = cartPt.x - cartPt.y;
    tempPt.y = (cartPt.x + cartPt.y) / 2;
    return tempPt;
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
