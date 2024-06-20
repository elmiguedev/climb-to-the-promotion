import { MIGOYA_DEPTH } from "../utils/Constants";
import { Player } from "./Player";

export class Migoya extends Phaser.Physics.Arcade.Sprite {
  private target: Player;

  constructor(scene: Phaser.Scene, x: number, y: number, target: Player) {
    super(scene, x, y, "migoya");
    this.target = target;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(1);
  }
}