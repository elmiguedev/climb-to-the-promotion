import { Scene } from "phaser";

export class WinScene extends Scene {

  constructor() {
    super("WinScene");
  }

  create() {
    this.createBackground();
    this.createTower();
    this.createPlayer();
    this.createIorio();
    this.createArgentina();

    this.sound.play("sevo");
  }

  createBackground() {
    this.cameras.main.setBackgroundColor("#70b5ee");

  }

  createTower() {
    const x = this.game.canvas.width / 2;
    const y = this.game.canvas.height

    const t = this.add.image(x, y, "tower");
    t.setScale(3);
    t.setDepth(2);
  }

  createPlayer() {
    const x = this.game.canvas.width / 2;
    const y = this.game.canvas.height - 364;
    const p = this.add.sprite(x, y, "player");
    p.setScale(3);
    p.anims.createFromAseprite("player");
    p.play({
      key: "win",
      repeat: -1,
      frameRate: 2,
      timeScale: 0.4
    })
    p.setDepth(3);
  }

  createIorio() {
    const x = this.game.canvas.width / 2;
    const y = 200;
    const i = this.add.image(x, y, "iorio");
    i.setScale(2);
    i.setDepth(1);
    i.setAlpha(0);

    this.tweens.add({
      targets: i,
      alpha: 0.7,
      duration: 5000,
      onComplete: () => {
        this.createText()
      }
    });
  }

  createArgentina() {
    const x = this.game.canvas.width / 2;
    const y = 200;

    const a = this.add.sprite(x, y, "argentina");
    a.anims.createFromAseprite("argentina");
    a.setScale(13);
    a.setAlpha(0);
    a.play({
      key: "idle",
      repeat: -1,
      frameRate: 2,
      timeScale: 0.2
    })
    a.setDepth(0);
    this.tweens.add({
      targets: a,
      alpha: 0.2,
      duration: 5000,
      onComplete: () => {
        // this.scene.start("GameOver");
      }
    });
  }

  createText() {
    const text = `Se vo, noma' y 
    al mundo salvarás`;
    const text2 = "Lograste trepar a lo mas alto de Globant";
    const text3 = "y ya sos el nuevo TL de la empresa";
    const text4 = `... ahora pibe anda a buscar las bolas del dragon y me revivis`;

    const x = this.game.canvas.width / 2;

    const t1 = this.add.text(x, 100, text, {
      fontFamily: "half_bold_pixel",
      fontSize: "36px",
      color: "#000000",
      align: "center"
    }).setAlpha(0).setOrigin(0.5).setDepth(6);

    const t2 = this.add.text(x, 550, text2, {
      fontFamily: "half_bold_pixel",
      fontSize: "32px",
      color: "#000000",
      backgroundColor: "#ffffff",
      padding: {
        x: 4,
        y: 4
      },
      align: "center"
    })
      .setWordWrapWidth(300)
      .setVisible(false)
      .setOrigin(0.5)
      .setDepth(6);

    this.tweens.add({
      targets: t1,
      alpha: 1,
      duration: 3000,
      onComplete: () => {
        t2.setVisible(true)
        this.time.delayedCall(5000, () => {
          t2.setText(text3);
          this.time.delayedCall(5000, () => {
            t2.setText(text4);
            this.time.delayedCall(5000, () => {
              this.scene.start("GameOverScene");
            });
          });
        })
      }
    });
  }
}
