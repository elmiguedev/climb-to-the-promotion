import { PLAYER_MOVE_SPEED, PLAYER_CLIMB_SPEED, PLAYER_DEPTH } from "../utils/Constants";

export class Player extends Phaser.Physics.Arcade.Sprite {
  private playerState: 'climbing' | 'moving' = 'climbing'
  public isDead: boolean = false;
  public isWinner: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(3);
    this.anims.createFromAseprite("player");
    this.body.setSize(16, 40);
    this.setDepth(PLAYER_DEPTH);
  }

  public startClimb() {
    this.setVelocityY(-PLAYER_CLIMB_SPEED);
    this.playClimbAnimation();
  }

  public moveUp() {
    this.playClimbAnimation();
    this.y -= PLAYER_MOVE_SPEED / 10;
  }

  public moveDown() {
    this.playClimbAnimation();
    this.y += PLAYER_MOVE_SPEED / 12;
  }

  public moveLeft() {
    if (this.playerState !== 'moving' && !this.isDead) {
      this.scene.sound.play("move");
      this.playerState = 'moving';
      this.scene.tweens.add({
        targets: this,
        x: this.x - PLAYER_MOVE_SPEED,
        duration: 200,
        onComplete: () => {
          this.playerState = 'climbing';
        }
      })
    }
  }

  public moveRight() {
    if (this.playerState !== 'moving' && !this.isDead) {
      this.scene.sound.play("move");
      this.playerState = 'moving';
      this.scene.tweens.add({
        targets: this,
        x: this.x + PLAYER_MOVE_SPEED,
        duration: 200,
        onComplete: () => {
          this.playerState = 'climbing';
        }
      })
    }
  }

  public stopMove() {
    this.anims.stop();
    this.setVelocityY(0);
  }

  private playClimbAnimation() {
    this.anims.play({
      key: "climb",
      timeScale: 0.5,
      repeat: -1
    }, true);
  }

  public hit() {
    if (!this.isDead) {
      this.isDead = true;
      this.scene.sound.removeAll();

      this.scene.sound.play("hit");

      this.anims.stop();
      this.scene.physics.pause();
      this.scene.time.delayedCall(1000, () => {
        this.scene.sound.play("gameover");
      })
      this.scene.time.delayedCall(4000, () => {
        this.scene.scene.restart();
      })
    }
  }

}