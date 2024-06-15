import { FIREMAN_DEPTH, FIREMAN_LINE_DEPTH } from "../utils/Constants";

export class Fireman extends Phaser.Physics.Arcade.Sprite {
  private line: Phaser.GameObjects.Rectangle;
  private linePosition: { x: number, y: number };

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "fireman");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(3);

    this.line = scene.add.rectangle(x, y - 600, 4, 600, 0xffffff);
    this.linePosition = { x: x, y: y };
    this.line.setVisible(false);
    this.line.setOrigin(0.5, 0);
    this.line.setDepth(FIREMAN_LINE_DEPTH)
    this.setDepth(FIREMAN_DEPTH)
    this.body.setSize(16, 40);

  }

  public fall() {
    this.line.setVisible(true);

    this.scene.add.tween({
      targets: this,
      y: this.y + 900,
      duration: 3000,
      onUpdate: () => {
        this.line.setDisplaySize(4, 600 + this.y - this.linePosition.y);
      },
      onComplete: () => {
        this.destroy();
        this.line.destroy();
      }
    })
  }
}