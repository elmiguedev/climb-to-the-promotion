import { BUCKET_DEPTH } from "../utils/Constants";
import { Player } from "./Player";

export class Bucket extends Phaser.Physics.Arcade.Sprite {
  private droppable: boolean = false;
  private target: Player;
  private activated: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, target: Player, droppable: boolean = false) {
    super(scene, x, y, "bucket");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.target = target;
    this.setScale(3);
    this.droppable = droppable;
    this.setDepth(BUCKET_DEPTH);
    this.scene.physics.add.overlap(this, this.target, () => {
      this.scene.sound.play("hit");
      this.scene.scene.restart()
    });
  }

  public drop() {
    if (this.droppable && !this.activated) {
      this.activated = true;
      this.shake();
    }
  }

  public isTargetVisible(target?: Player) {
    if (!target) return;
    const yDiff = target.y - this.y;
    const xDiff = target.x - this.x;
    if (Math.abs(yDiff) < 300 && Math.abs(xDiff) < 50) {
      return true;
    } else {
      return false;
    }
  }

  private shake() {
    this.scene.add.tween({
      targets: this,
      x: this.x + 10,
      duration: 100,
      yoyo: true,
      repeat: 6,
      onComplete: () => {
        this.fall();
      }
    })
  }

  private fall() {
    this.setVelocityY(300);
    this.scene.time.delayedCall(1000, () => {
      this.destroy();
    })
  }
}