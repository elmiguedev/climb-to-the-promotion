import { AIR_CONDITIONER_DEPTH } from "../utils/Constants";
import { Player } from "./Player";

export class AirConditioner extends Phaser.Physics.Arcade.Sprite {
  private target: Player;
  private droppable: boolean = false;
  private activated: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, target: Player, droppable: boolean = false) {
    super(scene, x, y, "airconditioner");
    this.target = target;
    this.droppable = droppable;
    this.setScale(3);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(AIR_CONDITIONER_DEPTH);
    this.anims.createFromAseprite("airconditioner");
    this.anims.play({
      key: "idle",
      repeat: -1,
      frameRate: 2,
      // timeScale: 1.5
    });
    this.scene.physics.add.overlap(this, this.target, () => {
      this.scene.sound.play("hit");
      this.scene.scene.restart()
    });
  }

  public update() {
    if (this.droppable && this.isTargetVisible()) {
      this.shake();
    }
  }

  public isTargetVisible() {
    if (!this.target) return;
    const yDiff = this.target.y - this.y;
    const xDiff = this.target.x - this.x - 40;
    console.log(Math.abs(xDiff));
    if (yDiff < 300 && Math.abs(xDiff) < 80) {
      return true;
    } else {
      return false;
    }
  }

  private shake() {
    if (!this.activated) {
      this.activated = true;
      this.scene.add.tween({
        targets: this,
        x: this.x + 4,
        duration: 70,
        yoyo: true,
        repeat: 6,
        onComplete: () => {
          this.fall();
        }
      })
    }
  }

  private fall() {
    if (this.body) {
      this.setAngle(2);
      this.setVelocityY(300);
      this.scene.time.delayedCall(1000, () => {
        this.destroy();
      })
    }
  }
}