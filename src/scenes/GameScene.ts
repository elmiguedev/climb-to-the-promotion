import { Scene } from "phaser";

export class GameScene extends Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.add.text(0, 0, "Climb to the promotion");
  }
}