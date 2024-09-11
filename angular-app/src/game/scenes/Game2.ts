import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import * as spine from "@esotericsoftware/spine-phaser";
import RAPIER from "@dimforge/rapier2d-compat";

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

  enemy: Phaser.GameObjects.Image;
  enemyBody: RAPIER.RigidBody;
  enemyCollider: RAPIER.Collider;

  isoDirectionNegativeX: Phaser.Geom.Point;
  isoDirectionPositiveX: Phaser.Geom.Point;
  isoDirectionPositiveY: Phaser.Geom.Point;
  isoDirectionNegativeY: Phaser.Geom.Point;

  roof_five_layer: Phaser.Tilemaps.TilemapLayer;

  speed: number = 1000;
  ready: boolean = false;

  spineObject: spine.SpineGameObject;

  rapierWorld: RAPIER.World;

  debugGraphics: Phaser.GameObjects.Graphics;
  playerRigidBody: RAPIER.RigidBody;
  playerCollider: RAPIER.Collider;

  characterController: RAPIER.KinematicCharacterController;

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

  async create() {
    const point = new Phaser.Geom.Point(-1, 0);
    this.isoDirectionNegativeX = this.cartesianToIsometric(point);
    const point2 = new Phaser.Geom.Point(1, 0);
    this.isoDirectionPositiveX = this.cartesianToIsometric(point2);
    const point3 = new Phaser.Geom.Point(0, 1);
    this.isoDirectionPositiveY = this.cartesianToIsometric(point3);
    const point4 = new Phaser.Geom.Point(0, -1);
    this.isoDirectionNegativeY = this.cartesianToIsometric(point4);

    this.editorCreate();

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
    this.roof_five_layer = this.iso.createLayer(
      "5-roof",
      ["iso-64x64-building", "iso-64x64-outside"],
      0,
      0,
    );

    // 5_grid_1
    const grid_five_layer = this.iso.createLayer("5-grid", ["64x64grid"], 0, 0);

    // this.player = new Phaser.GameObjects.Image(
    //   this,
    //   930,
    //   1066,
    //   "ship3",
    //   0,
    // ).setDepth(100);
    // this.add.existing(this.player);
    this.enemy = new Phaser.GameObjects.Image(
      this,
      930,
      1066,
      "ship3",
      0,
    ).setDepth(100);
    this.add.existing(this.enemy);
    this.ready = true;

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

    this.loadSpineAssets();
    this.setupInputListeners();
    this.setupCameras();
    await this.setupRapierPhysics();
    this.setupDebugGrpahics();

    this.characterController = this.rapierWorld.createCharacterController(0.01);

    EventBus.emit("current-scene-ready", this);
  }

  async setupRapierPhysics() {
    // Initialization: Initialize Rapier with await RAPIER.init().
    // Then, create a new Rapier world with gravity set to 9.81:
    await RAPIER.init();

    this.rapierWorld = new RAPIER.World(new RAPIER.Vector2(0.0, 0));
    // Create a Rapier dynamic rigid body
    // RAPIER.RigidBodyDesc.kinematicPositionBased()
    // const bodyDesc = RAPIER.RigidBodyDesc.dynamic();
    const bodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased();

    // Set its initial position to match our Phaser Game Object
    bodyDesc.setTranslation(this.spineObject.x, this.spineObject.y);

    // Store the Phaser Game Object in the rigid body's user data so we can sync its position and rotation
    bodyDesc.setUserData(this.spineObject);

    // Finally, create the rigid body in the Rapier world from the body description
    this.playerRigidBody = this.rapierWorld.createRigidBody(bodyDesc);

    const playerColliderBox = this.getPlayerColliderBox();
    console.dir(playerColliderBox);
    // const playerColliderDesc = RAPIER.ColliderDesc.ball(500); // Use a circle with radius 0.5
    const playerColliderDesc =
      RAPIER.ColliderDesc.convexHull(playerColliderBox); // Use a circle with radius 0.5
    // playerColliderDesc.setTranslation(-512, -256);
    this.playerCollider = this.rapierWorld.createCollider(
      playerColliderDesc,
      this.playerRigidBody,
    );

    const circleColliderDesc = RAPIER.ColliderDesc.ball(this.enemy.width / 2);
    const circleRigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(
      this.enemy.x,
      this.enemy.y,
    );
    circleRigidBodyDesc.setUserData(this.enemy);

    this.enemyBody = this.rapierWorld.createRigidBody(circleRigidBodyDesc);

    // Create the collider.
    this.enemyCollider = this.rapierWorld.createCollider(
      circleColliderDesc,
      this.enemyBody,
    );
    // this.enemyCollider.setFriction(0);
    this.enemyCollider.setRestitution(1);
  }

  getPlayerColliderBox() {
    // const float32 = new Float32Array([
    //   513, 143, 716, 0, 752, 1, 819, 42, 801, 90, 748, 122, 743, 152, 768, 151,
    //   789, 179, 813, 179, 908, 109, 1002, 145, 987, 198, 925, 236, 923, 257,
    //   1003, 320, 960, 360, 911, 371, 905, 413, 928, 473, 884, 443, 887, 495,
    //   857, 457, 769, 462, 768, 488, 572, 568, 496, 630, 464, 616, 488, 592, 434,
    //   569, 236, 658, 99, 694, 92, 592, 179, 569, 150, 546, 84, 566, 28, 543, 21,
    //   522, 158, 418, 152, 392, 93, 403, 99, 392, 282, 288, 282, 238, 365, 182,
    //   364, 163, 433, 164, 449, 122, 532, 73, 513, 101,
    // ]);

    // const float32 = new Float32Array([
    //   -179, -552, -130, -622, 44, -715, 47, -691, 4, -649, 0, -531, 406, -795,
    //   395, -827, 539, -910, 575, -891, 625, -909, 654, -864, 717, -828, 773,
    //   -823, 809, -791, 760, -680, 606, -584, 603, -509, 670, -512, 690, -498,
    //   697, -454, 755, -439, 760, -421, 895, -511, 889, -546, 1030, -627, 1061,
    //   -608, 1118, -625, 1155, -575, 1288, -522, 1299, -499, 1284, -446, 1249,
    //   -397, 1081, -294, 1075, -258, 1077, -235, 1217, -154, 1241, -159, 1296,
    //   -77, 1273, -65, 1280, -30, 1169, 34, 1134, 49, 1099, 35, 1032, 68, 1014,
    //   191, 1038, 181, 1042, 231, 1088, 326, 1058, 346, 978, 250, 1017, 362, 990,
    //   385, 906, 287, 809, 321, 814, 301, 801, 304, 759, 329, 662, 294, 680, 357,
    //   661, 374, 599, 392, 556, 434, 508, 439, 507, 463, 475, 481, 364, 473, 235,
    //   564, 170, 573, 107, 610, 100, 661, -50, 747, -103, 733, -133, 694, -64,
    //   645, -68, 631, -102, 615, -153, 623, -213, 578, -285, 626, -577, 739,
    //   -742, 824, -775, 802, -829, 833, -976, 858, -1065, 909, -1090, 905, -1107,
    //   888, -1088, 810, -1108, 756, -1076, 737, -1108, 651, -1018, 602, -979,
    //   614, -861, 576, -944, 524, -973, 539, -987, 508, -1110, 573, -1222, 553,
    //   -1273, 499, -1300, 500, -1294, 466, -1134, 365, -970, 234, -963, 206,
    //   -916, 183, -941, 116, -977, 113, -984, 87, -1081, 142, -1110, 136, -587,
    //   -163, -605, -292, -386, -416, -373, -440, -409, -458, -385, -485, -339,
    //   -506, -179, -465,
    // ]);

    const float32 = new Float32Array([
      558, 93.50900000000001, 585, 181.50900000000001, 534, 141.50900000000001,
      549, 190.50900000000001, 535, 208.50900000000001, 493, 161.50900000000001,
      405, 175.50900000000001, 369, 161.50900000000001, 362, 200.50900000000001,
      256, 260.509, 203, 257.509, 87, 312.509, 55, 330.509, 47, 362.509, -30,
      405.509, -70, 378.509, -42, 337.509, -83, 337.509, -114, 313.509, -401,
      445.509, -421, 434.509, -586, 493.509, -602, 461.509, -587, 389.509, -602,
      352.509, -471, 313.509, -536, 275.509, -606, 310.509, -668, 298.509, -704,
      270.509, -706, 253.50900000000001, -501, 98.50900000000001, -534,
      46.509000000000015, -606, 79.50900000000001, -598, 70.50900000000001,
      -324, -85.49099999999999, -321, -166.49099999999999, -216,
      -226.49099999999999, -214, -262.491, -179, -275.491, -108, -258.491, -82,
      -329.491, 19, -387.491, 2, -352.491, 0, -290.491, 11, -295.491, 287,
      -491.491, 337, -495.491, 437, -431.491, 410, -367.491, 334, -321.491, 327,
      -281.491, 363, -279.491, 388, -242.49099999999999, 412,
      -230.49099999999999, 553, -338.491, 600, -341.491, 706, -275.491, 674,
      -213.49099999999999, 584, -150.49099999999999, 584, -128.49099999999999,
      672, -88.49099999999999, 702, -49.490999999999985, 691,
      -14.490999999999985, 558, 37.509000000000015,
    ]);

    // const array = [];

    // function pairwise(arr, func) {
    //   for (let i = 0; i < arr.length; i += 2) {
    //     func(arr[i], arr[i + 1]);
    //   }
    // }
    // const what = this;
    // pairwise(float32, function (current, next) {
    //   console.log(current, next);
    //   const newPoint: Phaser.Geom.Point = new Phaser.Geom.Point(current, next);
    //   const point = what.cartesianToIsometric(newPoint);
    //   // const point = what.isometricToCartesian(newPoint);
    //   array.push(point.x);
    //   array.push(point.y);
    // });

    // return new Float32Array(array);
    return float32;
  }

  handleRapierPhysicsUpdate() {
    // Check if the Rapier world is initialized.
    if (this.rapierWorld !== undefined) {
      // Step the physics simulation.
      this.rapierWorld.step();
    }
  }
  updateGameObjectsForRapierPhysics() {
    // Update the Phaser game objects based on the physics simulation.
    this.rapierWorld.bodies.forEach((rigidBody) => {
      const gameObject = rigidBody.userData as
        | Phaser.GameObjects.Image
        | spine.SpineGameObject;
      if (gameObject !== undefined) {
        const position = rigidBody.translation();
        const angle = rigidBody.rotation();
        gameObject.x = position.x;
        gameObject.y = position.y;
        gameObject.setRotation(angle);
      }
    });
  }

  setupCameras() {
    this.cameras.main.setZoom(0.3);
    this.cameras.main.setScroll(-200, 200);
    this.cameras.main.setSize(1920, 1080);
  }

  setupInputListeners() {
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

      const tile = this.roof_five_layer.getIsoTileAtWorldXY(
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

      const tile = this.roof_five_layer.getIsoTileAtWorldXY(
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
  }

  lostFocus() {
    console.log("lost focus");
    this.input.keyboard.manager.enabled = true;
  }

  gainFocus() {
    console.log("gained focus");
    this.input.keyboard.manager.enabled = false;
  }

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
    // this.spineObject.scaleX = 0.75;
    // this.spineObject.scaleY = 0.75;
    // this.spineObject.scaleX = 1;
    // this.spineObject.scaleY = 1;
    this.spineObject.setInteractive();
    this.spineObject;
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

  setupDebugGrpahics() {
    this.debugGraphics = this.add.graphics();
    this.debugGraphics.setDepth(1000);
  }

  override update(time: number, delta: number) {
    // this.controls.update(delta);
    if (!this.ready) {
      return;
    }

    const previousPlayerXPosition = this.playerRigidBody.translation().x;
    const previousPlayerYPosition = this.playerRigidBody.translation().y;

    this.handleRapierPhysicsUpdate();

    // Render debug graphics
    this.debug();

    const wDown = this.keyW.isDown; //upRight
    const aDown = this.keyA.isDown; //upLeft
    const sDown = this.keyS.isDown; //downLeft
    const dDown = this.keyD.isDown; //downRight

    const gameObject = this.playerRigidBody;

    let moved = false;

    const desiredTranslation = { x: 0, y: 0 };

    this.characterController.setSlideEnabled(true);
    if (aDown) {
      moved = true;
      // this.spineObject.x += this.isoDirectionNegativeX.x * this.speed;
      // this.spineObject.y += this.isoDirectionNegativeX.y * this.speed;
      desiredTranslation.x +=
        this.isoDirectionNegativeX.x * this.speed * (delta / 1000);
      desiredTranslation.y +=
        this.isoDirectionNegativeX.y * this.speed * (delta / 1000);
      EventBus.emit("add-scrolled-data", this, {
        identifier: "console log info",
        data: "A key pressed",
      });
    }
    if (sDown) {
      moved = true;
      desiredTranslation.x +=
        this.isoDirectionPositiveY.x * this.speed * (delta / 1000);
      desiredTranslation.y +=
        this.isoDirectionPositiveY.y * this.speed * (delta / 1000);
      // this.spineObject.x += this.isoDirectionPositiveY.x * this.speed;
      // this.spineObject.y += this.isoDirectionPositiveY.y * this.speed;
      EventBus.emit("add-scrolled-data", this, {
        identifier: "console log info",
        data: "S key pressed",
      });
    }
    if (dDown) {
      moved = true;
      desiredTranslation.x +=
        this.isoDirectionPositiveX.x * this.speed * (delta / 1000);
      desiredTranslation.y +=
        this.isoDirectionPositiveX.y * this.speed * (delta / 1000);
      // this.spineObject.x += this.isoDirectionPositiveX.x * this.speed;
      // this.spineObject.y += this.isoDirectionPositiveX.y * this.speed;
      EventBus.emit("add-scrolled-data", this, {
        identifier: "console log info",
        data: "D key pressed",
      });
    }
    if (wDown) {
      moved = true;
      // this.spineObject.x += this.isoDirectionNegativeY.x * this.speed;
      // this.spineObject.y += this.isoDirectionNegativeY.y * this.speed;
      desiredTranslation.x +=
        this.isoDirectionNegativeY.x * this.speed * (delta / 1000);
      desiredTranslation.y +=
        this.isoDirectionNegativeY.y * this.speed * (delta / 1000);
      EventBus.emit("add-scrolled-data", this, {
        identifier: "console log info",
        data: "W key pressed",
      });
    }

    // Compute the player's collider movement considering obstacles
    this.characterController.computeColliderMovement(
      this.playerCollider,
      desiredTranslation,
    );
    const correctedMovement = this.characterController.computedMovement();

    // Compute the player's collider movement considering obstacles
    this.playerRigidBody.setNextKinematicTranslation({
      x: this.playerRigidBody.translation().x + correctedMovement.x,
      y: this.playerRigidBody.translation().y + correctedMovement.y,
    });

    const currentPlayerXPosition = this.playerRigidBody.translation().x;
    const currentPlayerYPosition = this.playerRigidBody.translation().y;

    // console.log("currentPlayerXPosition: " + currentPlayerXPosition);
    // console.log("currentPlayerYPosition: " + currentPlayerYPosition);
    // console.log("previousPlayerXPosition: " + previousPlayerXPosition);
    // console.log("previousPlayerYPosition: " + previousPlayerYPosition);

    let positiveXMovement = false;
    let positiveYMovement = false;
    let negativeYMovement = false;
    let negativeXMovement = false;

    if (moved) {
      EventBus.emit(
        "update-data-point",
        this,
        "player currentPlayerPosition position: " +
          "X: " +
          currentPlayerXPosition +
          " Y: " +
          currentPlayerYPosition +
          "       player previousPlayerPosition position: " +
          "X: " +
          previousPlayerXPosition +
          " Y: " +
          previousPlayerYPosition,
      );

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
        console.log("downright");
      } else if (negativeXMovement && negativeYMovement) {
        console.log("upleft");
        this.spineObject.animationState.setAnimation(0, "upleft", true);
      } else if (positiveXMovement && negativeYMovement) {
        console.log("upright");
        this.spineObject.animationState.setAnimation(0, "upright", true);
      } else if (negativeXMovement && positiveYMovement) {
        console.log("downleft");
        this.spineObject.animationState.setAnimation(0, "downleft", true);
      } else if (positiveXMovement) {
        console.log("right");
        this.spineObject.animationState.setAnimation(0, "right", true);
      } else if (negativeXMovement) {
        console.log("left");
        this.spineObject.animationState.setAnimation(0, "left", true);
      } else if (positiveYMovement) {
        console.log("down");
        this.spineObject.animationState.setAnimation(0, "down", true);
      } else if (negativeYMovement) {
        console.log("up");
        this.spineObject.animationState.setAnimation(0, "up", true);
      }
    }

    this.updateGameObjectsForRapierPhysics();
  }

  debug() {
    // Clear the previous debug graphics
    this.debugGraphics.clear();

    // Get the debug render information from RAPIER
    const debugRender = this.rapierWorld.debugRender();
    const vertices = debugRender.vertices;
    const colors = debugRender.colors;

    // Draw the debug lines for all objects in the RAPIER world
    for (let i = 0; i < vertices.length; i += 4) {
      const x1 = vertices[i];
      const y1 = vertices[i + 1];
      const x2 = vertices[i + 2];
      const y2 = vertices[i + 3];

      const colorIndex = i * 2;
      const r = colors[colorIndex];
      const g = colors[colorIndex + 1];
      const b = colors[colorIndex + 2];
      const a = colors[colorIndex + 3];

      this.debugGraphics.lineStyle(
        2,
        Phaser.Display.Color.GetColor(r * 255, g * 255, b * 255),
        a,
      );
      this.debugGraphics.lineBetween(x1, y1, x2, y2);
    }
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
}
