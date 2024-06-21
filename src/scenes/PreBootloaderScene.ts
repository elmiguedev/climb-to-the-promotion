import { Scene } from "phaser";
import MiniTowerPng from "../assets/sprites/tower/minitower.png";
import MiniGlobatPng from "../assets/sprites/tower/miniglobant.png";

export class PreBootloaderScene extends Scene {
  constructor() {
    super("PreBootloaderScene");
  }

  preload() {
    this.load.image("minitower", MiniTowerPng);
    this.load.image("miniglobant", MiniGlobatPng);
    this.load.once("complete", () => this.scene.start("BootloaderScene"));
  }

  create() {
    this.cameras.main.setBackgroundColor("#70b5ee");
  }
}