import { Game, Scene } from "phaser";
import { Player } from "../entities/Player";
import { Tower } from "../entities/Tower";
import { Fireman } from "../entities/Fireman";
import { GameHud } from "../hud/GameHud";
import { PLAYER_MOVE_SPEED } from "../utils/Constants";

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
    this.checkMusic();
  }

  createBackground() {
    this.cameras.main.setBackgroundColor("#70b5ee");
  }

  createTower() {
    const x = this.game.canvas.width / 2;
    const y = 0;
    this.tower = new Tower(this, x, y, this.player);
    this.tower.createTower();
  }

  createPlayer() {
    const x = this.game.canvas.width / 2;
    const y = -100;

    this.player = new Player(this, x, y);
    // this.player.startClimb();
  }

  createCursors() {
    const halfScreen = this.game.canvas.width / 2;
    const halfY = this.game.canvas.height / 3;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (pointer.y > halfY * 2) {
        if (pointer.x < halfScreen) {
          this.player.moveLeft();
        } else {
          this.player.moveRight();
        }
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
    // this.cameras.main.startFollow(this.player);
    // this.cameras.main.followOffset.set(width, 200);

    // const xc = this.game.canvas.width / 2;
    // this.cameras.main.pan(
    //   xc,
    //   this.tower.getHeight(),
    //   5000,
    //   "Cubic.easeInOut", true
    // )

    // Crear una animación para mover la cámara desde arriba hacia abajo
    this.cameras.main.scrollY = -this.tower.getHeight() - 400;
    this.tweens.add({
      targets: this.cameras.main,
      scrollY: -this.cameras.main.height,
      ease: 'Quart.easeInOut', // Tipo de animación
      duration: 5000, // Duración de la animación en milisegundos
      onComplete: () => {
        // this.time.delayedCall(1000, () => {
        this.cameras.main.startFollow(this.player);
        this.cameras.main.followOffset.set(width, 200);

        this.player.startClimb();
        this.hud.setVisible(true);

        // })
      }
    });
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
    const center = this.game.canvas.width / 2;
    const minX = center - (PLAYER_MOVE_SPEED * 2);
    const maxX = center + (PLAYER_MOVE_SPEED * 2);
    if (this.player.x <= minX) {
      this.player.x = minX
    }
    if (this.player.x >= maxX) {
      this.player.x = maxX
    }
    if (this.player.y > -100) {
      this.player.y = -100
    }
    if (this.player.y < -this.tower.getHeight() + 100) {
      this.player.y = -this.tower.getHeight() + 100
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

  checkMusic() {
    if (!this.player.isDead && this.tower.isLastFloor()) {
      const bossSong = this.sound.get("boss");
      if (!bossSong || !bossSong.isPlaying) {
        this.sound.stopAll();
        this.sound.play("boss", { loop: true });
      }
    }
  }
}