import { PLAYER_MOVE_SPEED, PLAYER_CLIMB_SPEED } from "../utils/Constants";

export class Player extends Phaser.Physics.Arcade.Sprite {

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(2);
    this.anims.createFromAseprite("player");
  }

  public startClimb() {
    this.setVelocityY(-PLAYER_CLIMB_SPEED);
    this.playClimbAnimation();
  }

  public moveUp() {
    this.playClimbAnimation();
    this.y -= PLAYER_MOVE_SPEED;
  }

  public moveDown() {
    this.playClimbAnimation();
    this.y += PLAYER_MOVE_SPEED;
  }

  public moveLeft() {
    this.playClimbAnimation();
    this.x -= PLAYER_MOVE_SPEED;
  }

  public moveRight() {
    this.playClimbAnimation();
    this.x += PLAYER_MOVE_SPEED;
  }

  public stopMove() {
    this.anims.stop();
  }

  private playClimbAnimation() {
    this.anims.play({
      key: "climb",
      timeScale: 0.5,
      repeat: -1
    }, true);
  }

}