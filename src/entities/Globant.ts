import { GLOBANT_BG_DEPTH, GLOBANT_DEPTH, SHOCK_DEPTH } from "../utils/Constants";
import { Player } from "./Player";

export class Globant extends Phaser.Physics.Arcade.Sprite {
  private target: Player;
  private activated: boolean = false;
  private globantLetter: Phaser.Physics.Arcade.Sprite;
  private shock: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, target: Player) {
    super(scene, x, y, "globant_bg");
    this.target = target;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(3);
    this.setDepth(GLOBANT_BG_DEPTH)
    this.globantLetter = this.scene.physics.add.sprite(
      this.x - 200,
      this.y
      , "globant");
    this.globantLetter.setScale(3);
    this.globantLetter.setDepth(GLOBANT_DEPTH);
    this.globantLetter.setOrigin(0.1, 0.5)

    this.shock = this.scene.physics.add.sprite(
      this.x,
      this.y,
      "shock");
    this.shock.anims.createFromAseprite("shock");
    this.shock.anims.play({
      key: "idle",
      repeat: -1,
      frameRate: 2,
    })
    this.shock.setDepth(SHOCK_DEPTH);

    this.startRandomShock();
  }

  update() {
    if (!this.activated && this.isTargetVisible()) {
      this.activated = true;
      // this.shake();
    }
  }

  public isTargetVisible() {
    if (!this.target) return;
    const yDiff = this.target.y - this.y;
    const xDiff = this.target.x - this.x;
    if (Math.abs(yDiff) < 350 && Math.abs(xDiff) < 100) {
      return true;
    } else {
      return false;
    }
  }

  private startShock() {
    const x = [
      0, 100, 200, 300, 400, 500
    ]
    this.scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.shock.x += 100;
        if (this.shock.x > 400) {
          this.shock.x = 0;
        }

      }
    })
  }

  private startRandomShock() {
    const x = [
      0, 100, 200, 300, 400, 500
    ]
    this.scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.shock.x = x[Math.floor(Math.random() * x.length)];
      }
    })
  }

  // private shake() {
  //   this.scene.add.tween({
  //     targets: this.globantLetter,
  //     x: 0.1,
  //     duration: 50,
  //     yoyo: true,
  //     repeat: 4,
  //     onComplete: () => {
  //       this.drop();
  //     }
  //   })
  // }

  // private fall() {
  //   this.globantLetter.setVelocityY(400);
  //   this.globantLetter.setVelocityX(-400);
  //   this.scene.time.delayedCall(1000, () => {
  //     this.destroy();
  //   })
  // }

  // private drop() {
  //   // this.globantLetter.setVelocityY(400);
  //   // this.scene.time.delayedCall(1000, () => {
  //   //   this.destroy();
  //   // })
  //   this.scene.tweens.add({
  //     targets: this.globantLetter,
  //     angle: 80,
  //     duration: 200,
  //     onComplete: () => {
  //       this.fall();
  //     }
  //   })
  // }
}