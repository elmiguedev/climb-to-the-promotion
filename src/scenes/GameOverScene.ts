import { Scene } from "phaser";

export class GameOverScene extends Scene {
  constructor() {
    super("GameOverScene");
  }

  create() {
    this.add.text(0, 0, "Climb to the promotion");
  }
}