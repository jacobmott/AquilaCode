import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import * as spine from "@esotericsoftware/spine-phaser";

export class Game2Scene extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameText: Phaser.GameObjects.Text;
  // game: Phaser.Game;
  label: Phaser.GameObjects.Text;
  label2: Phaser.GameObjects.Text;
  pointer: Phaser.Input.Pointer;
  tileTintOrig: number = 0xffffff;

  keyA: Phaser.Input.Keyboard.Key;
  keyS: Phaser.Input.Keyboard.Key;
  keyD: Phaser.Input.Keyboard.Key;
  keyW: Phaser.Input.Keyboard.Key;

  player: Phaser.GameObjects.Image;

  isoDirectionNegativeX: Phaser.Geom.Point;
  isoDirectionPositiveX: Phaser.Geom.Point;
  isoDirectionPositiveY: Phaser.Geom.Point;
  isoDirectionNegativeY: Phaser.Geom.Point;

  speed: number = 10;
  ready: boolean = false;

  spineObject: spine.SpineGameObject;

  constructor() {
    super("Game2");
  }

  editorCreate(): void {
    // iso
    const iso = this.add.tilemap("iso");
    iso.addTilesetImage("iso-64x64-building", "iso-64x64-building");
    iso.addTilesetImage("iso-64x64-outside", "iso-64x64-outside");
    iso.addTilesetImage("64x64grid", "64x64grid");
    iso.addTilesetImage("64x64grid2", "64x64grid2");
    iso.addTilesetImage("64x64bottom-iso-grid", "64x64bottom-iso-grid");
    iso.addTilesetImage("singleskele", "singleskele");
    iso.addTilesetImage("ship3.png", "ship3", 1024, 1024);
    iso.orientation = "isometric";

    this.iso = iso;

    // this.events.emit("scene-awake");
  }

  private iso!: Phaser.Tilemaps.Tilemap;

  // private controls!: Phaser.Cameras.Controls.SmoothedKeyControl;
  private controls!: Phaser.Cameras.Controls.FixedKeyControl;

  create() {
    // this.game.events.addListener(
    //   Phaser.Core.Events.FOCUS,
    //   this.gainFocus,
    //   this,
    // );
    // this.game.events.addListener(Phaser.Core.Events.BLUR, this.lostFocus, this);

    const point = new Phaser.Geom.Point(-1, 0);
    this.isoDirectionNegativeX = this.cartesianToIsometric(point);
    const point2 = new Phaser.Geom.Point(1, 0);
    this.isoDirectionPositiveX = this.cartesianToIsometric(point2);
    const point3 = new Phaser.Geom.Point(0, 1);
    this.isoDirectionPositiveY = this.cartesianToIsometric(point3);
    const point4 = new Phaser.Geom.Point(0, -1);
    this.isoDirectionNegativeY = this.cartesianToIsometric(point4);

    this.editorCreate();

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    // const cursors = this.input.keyboard!.createCursorKeys();

    const cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.cameras.main.setZoom(0.3);
    this.cameras.main.setScroll(-200, 200);
    this.cameras.main.setSize(1920, 1080);
    this.iso.createLayer("1-ground", ["iso-64x64-outside"], 0, 0);
    // 2_grid_1
    const grid_one_layer = this.iso.createLayer(
      "1-grid",
      ["64x64grid2", "64x64bottom-iso-grid"],
      0,
      0,
    );

    // const player_layer = this.iso.createLayer("player", ["singleskele"], 0, 0);
    const player_layer = this.iso.createLayer("player", ["singleskele"], 0, 0);
    const ships_layer: Phaser.Tilemaps.TilemapLayer = this.iso.createLayer(
      "ships",
      ["ship3.png"],
      0,
      -960, //We have to do this for some reason since this is an image and its 1024 instead of 64 width.. 1024 -64 = 960
    );
    //https://github.com/phaserjs/phaser/issues/5494
    ships_layer.setSkipCull(true);

    this.iso.createLayer(
      "2-stonebase",
      ["iso-64x64-building", "iso-64x64-outside"],
      0,
      0,
    );

    // 2_grid_1
    const grid_two_layer = this.iso.createLayer("2-grid", ["64x64grid"], 0, 0);

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

    // 5_grid_1
    const grid_five_layer = this.iso.createLayer("5-grid", ["64x64grid"], 0, 0);

    // const controlConfig = {
    //   camera: this.cameras.main,
    //   zoomSpeed: 0.05,
    //   left: cursors.left,
    //   right: cursors.right,
    //   up: cursors.up,
    //   down: cursors.down,
    //   acceleration: 0.04,
    //   zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
    //   zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    //   drag: 0.0007,
    //   maxSpeed: 0.7,
    // };

    this.player = new Phaser.GameObjects.Image(
      this,
      930,
      1066,
      "ship3",
      0,
    ).setDepth(100);
    this.add.existing(this.player);
    this.player = new Phaser.GameObjects.Image(
      this,
      930,
      1066,
      "ship3",
      0,
    ).setDepth(100);
    this.add.existing(this.player);
    this.ready = true;
    const controlConfig = {
      camera: this.cameras.main,
      zoomSpeed: 0.05,
      left: cursors["left"],
      right: cursors["right"],
      up: cursors["up"],
      down: cursors["down"],
      zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      speed: 1,
    };

    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      if (deltaY > 0) {
        const newZoom = this.cameras.main.zoom - 0.1;
        if (newZoom > 0.00001) {
          this.cameras.main.zoom = newZoom;
        }
      }

      if (deltaY < 0) {
        const newZoom = this.cameras.main.zoom + 0.1;
        if (newZoom < 5) {
          this.cameras.main.zoom = newZoom;
        }
      }

      // this.camera.centerOn(pointer.worldX, pointer.worldY);
      // this.camera.pan(pointer.worldX, pointer.worldY, 2000, "Power2");
    });

    this.input.on("pointermove", (pointer) => {
      if (!pointer.isDown) return;

      this.cameras.main.scrollX -=
        (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
      this.cameras.main.scrollY -=
        (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
    });

    // this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
    //   controlConfig,
    // );

    // this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

    // const grid: Phaser.GameObjects.Grid = this.add.grid(
    //   0,
    //   0,
    //   this.game.canvas.width,
    //   this.game.canvas.height,
    //   128,
    //   64,
    //   0x000000,
    //   0,
    //   0xff0000,
    //   1,
    // );
    // grid.angle = 40;
    // grid.setOrigin(0, 0);
    // this.add.text(
    //   0,
    //   64,
    //   "(grid Origin, x, y): " + grid.originX + " " + grid.originY,
    //   {
    //     fontFamily: '"Monospace"',
    //   },
    // );
    // grid.setOrigin(0.5, 0.5);
    // console.dir(map);
    this.label = this.add.text(512, 384, "(x, y)", {
      fontFamily: '"Monospace"',
    });
    this.label2 = this.add.text(512, 384, "(x, y)", {
      fontFamily: '"Monospace"',
    });
    this.pointer = this.input.activePointer;

    const rect1 = this.add.rectangle(0, 0, 20, 20, 0x6666ff, 1);
    this.add
      .text(0, 0, "0,0", {
        fontFamily: "Arial Black",
        fontSize: 8,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100);

    this.iso;
    const rect2 = this.add.rectangle(4096, 0, 20, 20, 0x6666ff, 1);
    this.add
      .text(4096, 0, "4096,0", {
        fontFamily: "Arial Black",
        fontSize: 8,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100);

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

    this.loadSpineAssets();

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

  loadSpineAssets() {
    // Create a SpineGameObject through the GameObjectFactory and add it to the scene
    this.spineObject = this.add.spine(
      1545,
      18,
      "Ship3AllLayersAlignedCenter-data",
      "Ship3AllLayersAlignedCenter-atlas",
    );
    this.spineObject.setDepth(101);
    this.spineObject.skeleton.setSkinByName("DefaultSkin");
    this.spineObject.scaleX = 0.75;
    this.spineObject.scaleY = 0.75;
    this.spineObject.setInteractive();

    // const animations: string[] =
    //   this.spineObject.animationState.data.skeletonData.animations[0].name;

    // const index = Math.random();

    this.input.enableDebug(this.spineObject, 0xff00ff);
    this.spineObject.animationState.setAnimation(0, "downleft", true);
    // this.spineObject.on("pointerdown", () =>
    //   this.spineObject.animationState.setAnimation(0, "downleft", true),
    // );
    // // Create a SpineGameObject through the GameObjectCreator. It is not automatically
    // // added to the scene.
    // const spineObject2 = this.make.spine({
    //   x: 200,
    //   y: 500,
    //   dataKey: "skeleton-data",
    //   atlasKey: "skeleton-atlas",
    // });

    // // Manually add the game object to the scene
    // this.add.existing(spineObject2);
  }

  override update(time: number, delta: number) {
    // this.controls.update(delta);
    if (!this.ready) {
      return;
    }

    const wDown = this.keyW.isDown; //upRight
    const aDown = this.keyA.isDown; //upLeft
    const sDown = this.keyS.isDown; //downLeft
    const dDown = this.keyD.isDown; //downRight
    // const wAndADown = wDown && aDown; //up(diagonal) upRight and upLeft
    // const wAndDDown = wDown && dDown; //right(diagonal) upRight and downRight
    // const sAndADown = sDown && aDown; //left(diagonal) downLeft and upLeft
    // const sAndDDown = sDown && dDown; //down(diagonal) downLeft and downRight

    // const aAndDDown = aDown && dDown; //upLeft and downRight, cancel movement
    // const wAndSDown = wDown && sDown; //upRight and downLeft, cancel movement
    // const wAndSAndAAndDDown = wDown && sDown && aDown && dDown; //all keys pressed, cancel movement
    // if (wAndSAndAAndDDown) {
    //   return;
    // }

    const previousPlayerXPosition = this.spineObject.x;
    const previousPlayerYPosition = this.spineObject.y;
    let moved = false;
    if (aDown) {
      moved = true;
      // this.x += this.direction.x * this.speed;
      // this.y += this.direction.y * this.speed;
      // this.player.x += this.isoDirectionNegativeX.x * this.speed;
      // this.player.y += this.isoDirectionNegativeX.y * this.speed;
      this.spineObject.x += this.isoDirectionNegativeX.x * this.speed;
      this.spineObject.y += this.isoDirectionNegativeX.y * this.speed;
      // this.spineObject.animationState.setAnimation(0, "upleft", true);
      EventBus.emit("add-scrolled-data", this, {
        identifier: "console log info",
        data: "A key pressed",
      });
    }
    if (sDown) {
      moved = true;
      // this.player.x += this.isoDirectionPositiveY.x * this.speed;
      // this.player.y += this.isoDirectionPositiveY.y * this.speed;
      this.spineObject.x += this.isoDirectionPositiveY.x * this.speed;
      this.spineObject.y += this.isoDirectionPositiveY.y * this.speed;
      // this.spineObject.animationState.setAnimation(0, "downleft", true);
      EventBus.emit("add-scrolled-data", this, {
        identifier: "console log info",
        data: "S key pressed",
      });
    }
    if (dDown) {
      moved = true;
      // this.player.x += this.isoDirectionPositiveX.x * this.speed;
      // this.player.y += this.isoDirectionPositiveX.y * this.speed;
      this.spineObject.x += this.isoDirectionPositiveX.x * this.speed;
      this.spineObject.y += this.isoDirectionPositiveX.y * this.speed;
      // this.spineObject.animationState.setAnimation(0, "downright", true);
      EventBus.emit("add-scrolled-data", this, {
        identifier: "console log info",
        data: "D key pressed",
      });
    }
    if (wDown) {
      moved = true;
      // this.player.x += this.isoDirectionNegativeY.x * this.speed;
      // this.player.y += this.isoDirectionNegativeY.y * this.speed;
      this.spineObject.x += this.isoDirectionNegativeY.x * this.speed;
      this.spineObject.y += this.isoDirectionNegativeY.y * this.speed;
      // this.spineObject.animationState.setAnimation(0, "upright", true);
      EventBus.emit("add-scrolled-data", this, {
        identifier: "console log info",
        data: "W key pressed",
      });
    }

    const currentPlayerXPosition = this.spineObject.x;
    const currentPlayerYPosition = this.spineObject.y;

    let positiveXMovement = false;
    let positiveYMovement = false;
    let negativeYMovement = false;
    let negativeXMovement = false;

    if (moved) {
      if (currentPlayerXPosition > previousPlayerXPosition) {
        positiveXMovement = true;
      } else if (currentPlayerXPosition < previousPlayerXPosition) {
        negativeXMovement = true;
      }
      if (currentPlayerYPosition > previousPlayerYPosition) {
        positiveYMovement = true;
      } else if (currentPlayerYPosition < previousPlayerYPosition) {
        negativeYMovement = true;
      }

      if (positiveXMovement && positiveYMovement) {
        this.spineObject.animationState.setAnimation(0, "downright", true);
      } else if (negativeXMovement && negativeYMovement) {
        this.spineObject.animationState.setAnimation(0, "upleft", true);
      } else if (positiveXMovement && negativeYMovement) {
        this.spineObject.animationState.setAnimation(0, "upright", true);
      } else if (negativeXMovement && positiveYMovement) {
        this.spineObject.animationState.setAnimation(0, "downleft", true);
      } else if (positiveXMovement) {
        this.spineObject.animationState.setAnimation(0, "right", true);
      } else if (negativeXMovement) {
        this.spineObject.animationState.setAnimation(0, "left", true);
      } else if (positiveYMovement) {
        this.spineObject.animationState.setAnimation(0, "down", true);
      } else if (negativeYMovement) {
        this.spineObject.animationState.setAnimation(0, "up", true);
      }
    }

    // if (movingLeft)
    // if (aAndDDown || wAndSDown) {
    //   return;
    // }

    // if (wAndADown) {
    //   this.spineObject.animationState.setAnimation(0, "up", true);
    // } else if (wAndDDown) {
    //   this.spineObject.animationState.setAnimation(0, "right", true);
    // } else if (sAndADown) {
    //   this.spineObject.animationState.setAnimation(0, "left", true);
    // } else if (sAndDDown) {
    //   this.spineObject.animationState.setAnimation(0, "down", true);
    // }

    EventBus.emit(
      "update-data-point",
      this,
      "player isometric position: " +
        "X: " +
        this.player.x +
        " Y: " +
        this.player.y,
    );
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
