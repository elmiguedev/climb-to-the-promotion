import { Scene } from "phaser";

export class StartScene extends Scene {
  constructor() {
    super("StartScene");
  }

  create() {
    this.add.text(0, 0, "Climb to the promotion");
  }
}