import { Scene } from "phaser";
import { Player } from "../entities/Player";
import { Tower } from "../entities/Tower";

export class StartScene extends Scene {
  private player: Player;
  private tower: Tower;
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
    this.createTower();
    this.createPlayer();
    this.createCursors();
    this.createCamera();
  }

  update(time: number, delta: number): void {
    this.checkCursors();
    this.checkCollisions();
  }

  createBackground() {
    this.cameras.main.setBackgroundColor("#70b5ee");
  }

  createTower() {
    const x = this.game.canvas.width / 2;
    const y = 0;
    this.tower = new Tower(this, x, y);
  }

  createPlayer() {
    const x = this.game.canvas.width / 2;
    const y = -100;

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
    const towerHeight = this.tower.getHeight() + 1000;
    const x = 0;//-320;
    const y = -towerHeight
    const width = (160 * 4) + 420
    const height = towerHeight;

    this.cameras.main.setBounds(
      x,
      y,
      width,
      height
    );
    this.cameras.main.startFollow(this.player);
    this.cameras.main.followOffset.set(width, 200);
  }

  checkCursors() {
    if (this.cursors.left.isDown) {
      this.player.moveLeft();
    }

    if (this.cursors.right.isDown) {
      this.player.moveRight();
    }

    if (this.cursors.up.isDown) {
      this.player.moveUp();
    }

    if (this.cursors.down.isDown) {
      this.player.moveDown();
    }

  }

  checkCollisions() {
    if (this.player.x < this.tower.x - this.tower.getWidth() / 2) {
      this.player.x = this.tower.x - this.tower.getWidth() / 2
    }
    if (this.player.x > this.tower.x + this.tower.getWidth() / 2) {
      this.player.x = this.tower.x + this.tower.getWidth() / 2
    }
    if (this.player.y > -100) {
      this.player.y = -100
    }
    if (this.player.y < -this.tower.getHeight() - 50) {
      this.player.y = -this.tower.getHeight() - 50
    }
  }
}