import { Game, Scene } from "phaser";
import { Player } from "../entities/Player";
import { Tower } from "../entities/Tower";
import { Fireman } from "../entities/Fireman";
import { GameHud } from "../hud/GameHud";

export class StartScene extends Scene {
  private player: Player;
  private tower: Tower;
  private hud: GameHud;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private aswdCursors: {
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };
  private touchCursors: {
    left: Phaser.Input.Pointer;
    right: Phaser.Input.Pointer;
  };
  private stopKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super("StartScene");
  }

  create() {
    this.createBackground();
    this.createPlayer();
    this.createTower();
    this.createCursors();
    this.createCamera();
    this.createHud();
    this.createMusic();

    this.time.addEvent({
      delay: 4000,
      loop: true,
      callback: () => {
        const x = Phaser.Math.Between(100, 500)
        const fireman = new Fireman(this, x, this.player.y - 600);
        fireman.fall();
        this.physics.add.overlap(this.player, fireman, () => {
          this.sound.play("hit");
          this.scene.restart()
        })
      }
    })

    this.aswdCursors = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    this.aswdCursors.left.onDown = () => {
      this.player.moveLeft();
    }

    this.aswdCursors.right.onDown = () => {
      this.player.moveRight();
    }

    this.stopKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.stopKey.onDown = () => {
      this.player.stopMove();
    }

    this.stopKey.onUp = () => {
      this.player.startClimb();
    }
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
    this.tower = new Tower(this, x, y, this.player);
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

  createHud() {
    this.scene.run("GameHud");
    this.hud = this.scene.get("GameHud") as GameHud;
    this.hud.setTower(this.tower);
  }

  createMusic() {
    this.sound.stopAll();
    this.sound.play("bg", {
      loop: true
    })
  }
}