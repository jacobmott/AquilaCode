import { Boot } from "./scenes/Boot";
import { GameOver } from "./scenes/GameOver";
import { GameScene as MainGame } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { AUTO, Game, WEBGL } from "phaser";
import { Preloader } from "./scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: WEBGL,
  width: 1920,
  height: 1080,
  parent: "game-container",
  backgroundColor: "#4488aa",
  transparent: false,
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
  fps: {
    forceSetTimeOut: true,
    // panicMax: 0,
    // smoothStep: false,
    target: 60,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
