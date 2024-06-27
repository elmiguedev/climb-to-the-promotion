import { Scene } from "phaser";

export class GameOverScene extends Scene {
  constructor() {
    super("GameOverScene");
  }

  create() {
    this.cameras.main.setBackgroundColor(0x000000)
    const x = this.game.canvas.width / 2;
    const jugar = this.add.text(x, 100, "- Jugar de nuevo - ", {
      fontFamily: "half_bold_pixel",
      fontSize: "36px",
      color: "#ffffff",
      align: "center"
    }).setOrigin(0.5);
    jugar.setInteractive({ cursor: "pointer" });
    jugar.on("pointerdown", () => {
      this.scene.start("GameScene");
    });

    const repo = this.add.text(x, 200, "- Ir al repositorio - ", {
      fontFamily: "half_bold_pixel",
      fontSize: "36px",
      color: "#ffffff",
      align: "center"
    }).setOrigin(0.5);
    repo.setInteractive({ cursor: "pointer" });
    repo.on("pointerdown", () => {
      window.open("https://github.com/elmiguedev/climb-to-the-promotion", "_blank");
    });

    const twitch = this.add.text(x, 300, "- Ir mi twitch - ", {
      fontFamily: "half_bold_pixel",
      fontSize: "36px",
      color: "#ffffff",
      align: "center"
    }).setOrigin(0.5);
    twitch.setInteractive({ cursor: "pointer" });
    twitch.on("pointerdown", () => {
      window.open("https://twitch.tv/elmiguedev", "_blank");
    });
  }
}