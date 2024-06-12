import { Scene } from "phaser";

export class BootloaderScene extends Scene {
  constructor() {
    super("BootloaderScene");
  }

  create() {
    this.add.text(0, 0, "Climb to the promotion");
  }
}