import { Component, Input, OnInit } from "@angular/core";
import Phaser from "phaser";
import StartGame from "./main";
import { EventBus } from "./EventBus";

@Component({
  selector: "app-aquila-phaser-game",
  templateUrl: "./phaser-game.component.html",
  standalone: true,
})
export class PhaserGame implements OnInit {
  scene: Phaser.Scene;
  game: Phaser.Game;

  sceneCallback: (scene: Phaser.Scene) => void;

  ngOnInit() {
    this.game = StartGame("game-container");

    EventBus.on("current-scene-ready", (scene: Phaser.Scene) => {
      this.scene = scene;

      if (this.sceneCallback) {
        this.sceneCallback(scene);
      }
    });
  }

  // Component unmounted
  ngOnDestroy() {
    if (this.game) {
      this.game.destroy(true);
    }
  }
}
