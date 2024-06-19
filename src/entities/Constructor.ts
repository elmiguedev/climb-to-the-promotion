import { CONSTRUCTOR_DEPTH } from "../utils/Constants";
import { Bucket } from "./Bucket";
import { Player } from "./Player";

export class Constructor extends Phaser.Physics.Arcade.Sprite {
  private target: Player;
  private bucket?: Bucket;
  private buckets?: Phaser.Physics.Arcade.Group;


  constructor(scene: Phaser.Scene, x: number, y: number, target: Player) {
    super(scene, x, y, "constructor");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(3);
    this.body.setSize(this.width, 12);
    this.body.setOffset(0, 90);
    this.setDepth(CONSTRUCTOR_DEPTH)
    this.target = target;
    this.buckets = this.scene.physics.add.group({
      runChildUpdate: true
    })
    this.scene.physics.add.overlap(this, this.target, () => {
      this.scene.sound.play("hit");
      this.scene.scene.restart()
    })
  }

  public createBucket(position: 'left' | 'right' | 'center') {
    let x = 0;
    let y = this.y + 250;
    switch (position) {
      case 'left':
        x = this.x + 10;
        break;
      case 'right':
        x = this.x + 250;
        break;
      case 'center':
        x = this.x + 125;
        break;
    }

    const bucket = new Bucket(this.scene, x, y, this.target, Math.random() < 0.5);
    this.buckets.add(bucket);
    bucket.setPosition(x, y);
  }


}