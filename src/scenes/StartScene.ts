import { Scene } from "phaser";
import { Player } from "../entities/Player";

export class StartScene extends Scene {
  private player: Player;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private touchCursors: {
    left: Phaser.Input.Pointer;
    right: Phaser.Input.Pointer;
  };

  constructor() {
    super("StartScene");
  }

  create() {
    this.createBackground();
    this.createPlayer();
    this.createCursors();
    this.createCamera();
  }

  update(time: number, delta: number): void {
    this.checkCursors();
  }

  createBackground() {
    const tower = this.add.image(0, 0, "tower");
    tower.setScale(4)
    tower.setOrigin(0, 0)
  }

  createPlayer() {
    const x = this.game.canvas.width / 2;
    const y = this.game.canvas.height;

    this.player = new Player(this, x, y);
    this.player.startClimb();
  }

  createCursors() {
    const halfScreen = this.game.canvas.width / 2;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (pointer.x < halfScreen) {
        this.player.moveLeft();
      } else {
        this.player.moveRight();
      }
    })
  }

  createCamera() {
    this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width, 2000);
    this.cameras.main.startFollow(this.player, false, 1, 1);
    this.cameras.main.followOffset.set(0, 200);
  }

  checkCursors() {
    if (this.cursors.left.isDown) {
      this.player.moveLeft();
    }

    if (this.cursors.right.isDown) {
      this.player.moveRight();
    }

  }
}