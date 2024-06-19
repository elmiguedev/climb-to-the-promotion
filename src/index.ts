import { Game } from "phaser";
import { BootloaderScene } from "./scenes/BootloaderScene";
import { StartScene } from "./scenes/StartScene";
import { GameScene } from "./scenes/GameScene";
import { GameOverScene } from "./scenes/GameOverScene";
import { GameHud } from "./hud/GameHud";

export default new Game({
  type: Phaser.AUTO,
  parent: "#canvas",
  width: 480,
  height: 720,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0,
        x: 0
      },
      debug: false
    }
  },
  render: {
    pixelArt: true,
  },
  scene: [
    BootloaderScene,
    StartScene,
    GameScene,
    GameOverScene,
    GameHud
  ]
})