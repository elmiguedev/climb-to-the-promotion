import { MIGOYA_BULLETS, MIGOYA_DEPTH } from "../utils/Constants";
import { Player } from "./Player";

export class Migoya extends Phaser.Physics.Arcade.Sprite {
  private target: Player;
  private isActive: boolean = false;
  private isHit: boolean = false;
  private hp: number = 20;
  private attackTimer: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, x: number, y: number, target: Player) {
    super(scene, x, y, "migoya");
    this.target = target;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.anims.createFromAseprite("migoya");
    this.anims.play("idle")
    this.setScale(3);
    this.setDepth(0);

    this.on("animationcomplete", (animation) => {
      if (animation.key !== "idle") {
        this.anims.play("idle")
      }
    })

    this.setInteractive();
    this.on("pointerdown", () => {
      if (this.isActive) {
        this.hit();
      }
    })
  }

  update() {
    if (!this.isActive && this.isTargetVisible()) {
      this.startAttack();
    }

  }

  public isTargetVisible() {
    if (!this.target) return;
    const yDiff = this.target.y - this.y;
    const xDiff = this.target.x - this.x;
    if (Math.abs(yDiff) < 300) {
      return true;
    } else {
      return false;
    }
  }

  private startAttack() {
    this.isActive = true;
    this.attackTimer = this.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.attack();
      },
      loop: true
    })
  }

  public hit() {
    if (!this.isHit && !this.target.isDead) {
      this.scene.sound.play("roar");
      this.hp--;

      if (this.hp <= 0) {
        this.kill();
        return;
      }

      this.setTintLevel();
      this.isHit = true;
      this.shake();
      this.anims.play({
        key: "hit",
        timeScale: 0.2,
      }, true);
      this.scene.time.delayedCall(500, () => {
        this.isHit = false;
      })
    }
  }

  private shake() {
    this.scene.tweens.add({
      targets: this,
      x: this.x + 10,
      duration: 20,
      repeat: 4,
      yoyo: true,
    })
  }

  private attack() {
    this.scene.sound.play("bossattack");
    const y = this.y - 300;
    const x = Phaser.Math.Between(0, 400);
    const bullet = this.scene.physics.add.image(x, y, "globant_bullet");
    bullet.setScale(3);
    bullet.setAngle(90);
    bullet.setDepth(MIGOYA_BULLETS);
    bullet.setVelocityY(500);
    this.anims.play({
      key: "attack",
      timeScale: 0.2,
    }, true)
    this.scene.physics.add.overlap(this.target, bullet, () => {
      this.target.hit();
      bullet.destroy()
    })

    this.scene.time.delayedCall(2000, () => {
      if (bullet) {
        bullet.destroy();
      }
    })
  }

  private kill() {
    this.target.isWinner = true;
    this.scene.tweens.add({
      targets: this,
      x: this.x + 10,
      duration: 20,
      repeat: -1,
      yoyo: true,
    });

    this.anims.play("hit", true);

    const bossSound = this.scene.sound.get("boss");
    if (bossSound && bossSound.isPlaying) {
      bossSound.stop();
    }

    const s = this.scene.sound.play("roar", {
      loop: true,
    });

    this.scene.time.delayedCall(2900, () => {
      this.scene.sound.stopAll();
      this.scene.scene.start("WinScene")

    });


    this.attackTimer.destroy();
    this.scene.tweens.add({
      targets: this,
      y: -600,
      duration: 14000,
      onComplete: () => {
        this.destroy();
      }
    })


  }


  private setTintLevel() {
    if (this.hp < 4) {
      this.setTint(0xff7777);
    } else if (this.hp < 8) {
      this.setTint(0xff9999);
    } else if (this.hp < 12) {
      this.setTint(0xffbbbb);
    } else if (this.hp < 16) {
      this.setTint(0xffdddd);
    } else if (this.hp < 20) {
      this.setTint(0xffffff);
    }
  }

}