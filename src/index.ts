import { Game } from "phaser";
import { BootloaderScene } from "./scenes/BootloaderScene";
import { GameScene } from "./scenes/GameScene";
import { StartScene } from "./scenes/StartScene";
import { GameOverScene } from "./scenes/GameOverScene";
import { GameHud } from "./hud/GameHud";
import { PreBootloaderScene } from "./scenes/PreBootloaderScene";
import { WinScene } from "./scenes/WinScene";

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
  backgroundColor: "#70b5ee",
  scene: [
    PreBootloaderScene,
    BootloaderScene,
    StartScene,
    GameScene,
    GameOverScene,
    GameHud,
    WinScene
  ]
})