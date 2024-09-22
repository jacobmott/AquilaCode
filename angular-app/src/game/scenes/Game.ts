import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import * as spine from "@esotericsoftware/spine-phaser";
import RAPIER from "@dimforge/rapier2d-compat";

import { AquilaTileMap } from "../types/AquilaTileMap";
import { AquilaInputService } from "../services/AquilaInputService";
import { AquilaPlayer } from "../types/AquilaPlayer";
import { AquilaEnemy } from "../types/AquilaEnemy";
import { AquilaObstacle } from "../types/AquilaObstacle";

export class GameScene extends Scene {
  debugGraphics: Phaser.GameObjects.Graphics;

  rapierWorld: RAPIER.World;
  eventQueue: RAPIER.EventQueue;

  aquilaInputService: AquilaInputService;
  aquilaPlayer: AquilaPlayer;

  aquilaObstacleWall: AquilaObstacle;
  aquilaEnemy: AquilaEnemy;

  tileMap: AquilaTileMap;

  ready: boolean = false;

  constructor() {
    super("Game2");
  }

  async create() {
    this.aquilaInputService = new AquilaInputService(this);
    await this.setupRapierPhysics();

    this.setupWorld();

    this.setupCameras();

    this.ready = true;
    EventBus.emit("current-scene-ready", this);
    this.events.emit("scene-awake");
  }

  setupWorld() {
    this.addPointsOnMap();

    this.tileMap = new AquilaTileMap(this, this.aquilaInputService);

    this.aquilaPlayer = new AquilaPlayer(
      this.add.spine(1545, 100, "Ship0-360-data", "Ship0-360-atlas"),
      this.aquilaInputService,
      this.rapierWorld,
    );
    this.aquilaObstacleWall = new AquilaObstacle(
      new Phaser.GameObjects.Image(this, 2000, 1066, "largewall", 0),
      this.aquilaInputService,
      this.rapierWorld,
    );
    this.aquilaEnemy = new AquilaEnemy(
      new Phaser.GameObjects.Image(this, 930, 1066, "ship3", 0),
      this.aquilaInputService,
      this.rapierWorld,
    );
  }

  addPointsOnMap() {
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
  }

  async setupRapierPhysics() {
    // Initialization: Initialize Rapier with await RAPIER.init().
    // Then, create a new Rapier world with gravity set to 9.81:
    await RAPIER.init();

    this.rapierWorld = new RAPIER.World(new RAPIER.Vector2(0.0, 0));
    this.eventQueue = new RAPIER.EventQueue(false);
    this.setupDebugRapierGraphics();
  }

  stepRapierPhysics() {
    // Check if the Rapier world is initialized.
    if (this.rapierWorld !== undefined) {
      // Step the physics simulation.

      const eventQueue = new RAPIER.EventQueue(true);
      this.rapierWorld.step(eventQueue);

      eventQueue.drainCollisionEvents((handle1, handle2, started) => {
        /* Handle the collision event. */
        console.log("contact collision event");
        console.log("handle1");
        console.dir(handle1);
        console.log("handle2");
        console.dir(handle2);
        console.log("started");
        console.dir(started);
      });

      eventQueue.drainContactForceEvents((event) => {
        const handle1 = event.collider1(); // Handle of the first collider involved in the event.
        const handle2 = event.collider2(); // Handle of the second collider involved in the event.
        console.log("contact force event");
        // console.log("handle1");
        // console.dir(handle1);
        // console.log("handle2");
        // console.dir(handle2);
        /* Handle the contact force event. */
      });
    }
  }

  syncGameObjectsWithRapierPhysics() {
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
    // this.cameras.main.setScroll(-200, 200);
    this.cameras.main.setSize(1920, 1080);
  }

  lostFocus() {
    this.input.keyboard.manager.enabled = true;
  }

  gainFocus() {
    this.input.keyboard.manager.enabled = false;
  }

  setupDebugRapierGraphics() {
    this.debugGraphics = this.add.graphics();
    this.debugGraphics.setDepth(2000);
  }

  override update(time: number, delta: number) {
    if (!this.ready) {
      return;
    }
    this.aquilaInputService.update();
    this.aquilaPlayer.updateManually(time, delta);
    this.stepRapierPhysics();
    this.debugRapierPhysics();
    this.syncGameObjectsWithRapierPhysics();
  }

  debugRapierPhysics() {
    // Clear the previous debug graphics
    if (!this.debugGraphics) {
      return;
    }
    this.debugGraphics?.clear();

    // Get the debug render information from RAPIER
    const debugRender = this.rapierWorld?.debugRender();
    const vertices = debugRender?.vertices;
    const colors = debugRender?.colors;

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
}
