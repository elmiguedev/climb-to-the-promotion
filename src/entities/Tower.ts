import { TOWER_DEPTH } from "../utils/Constants";
import { AirConditioner } from "./AirConditioner";
import { Constructor } from "./Constructor";
import { Player } from "./Player";

export class Tower {
  private FLOOR_LENGTH = 6;
  private FLOOR_HEIGHT = 180 * 4;
  private FLOOR_WIDTH = 160 * 4;
  private target: Player;
  private constructors: Phaser.Physics.Arcade.Group;
  private airConditioners: Phaser.Physics.Arcade.Group;

  constructor(
    private scene: Phaser.Scene,
    public x: number,
    public y: number,
    player: Player
  ) {
    this.constructors = this.scene.physics.add.group({
      runChildUpdate: true
    });
    this.airConditioners = this.scene.physics.add.group({
      runChildUpdate: true
    });
    this.target = player;
    this.createTower();
  }

  public getHeight() {
    return this.FLOOR_HEIGHT * this.FLOOR_LENGTH;
  }

  public getWidth() {
    return this.FLOOR_WIDTH;
  }

  public getPlayerFloor() {
    const y = this.target.y;
    const floor = Math.floor(Math.abs(y) / this.FLOOR_HEIGHT);
    return floor;
  }

  private createTower() {
    for (let i = 0; i < this.FLOOR_LENGTH; i++) {
      this.createFloor(
        this.x,
        this.y - (this.FLOOR_HEIGHT * i)
      );
    }
  }

  private createFloor(x: number, y: number) {
    const floor = this.scene.add.image(x, y, "tower");
    floor.setOrigin(0.5, 1);
    floor.setScale(4);
    floor.setDepth(TOWER_DEPTH)
    this.createConstructor(x, y);
    this.createAirConditioner(x, y);
  }

  private createConstructor(x: number, y: number) {
    const rnd = Phaser.Math.Between(1, 5)
    const positionRnd = Phaser.Math.Between(0, 1)
    const xConstructor = positionRnd === 0 ? -50 : 230
    if (rnd >= 1) {
      const constructor = new Constructor(
        this.scene,
        xConstructor,
        y - 18,
        this.target
      ).setOrigin(0);
      this.constructors.add(constructor);
      constructor.setPosition(xConstructor, y - 18);
      constructor.createBucket(positionRnd === 0 ? 'right' : 'left');
    }

  }

  private createAirConditioner(x: number, y: number) {
    const airConditioner = new AirConditioner(
      this.scene,
      x,
      y - 18,
      this.target,
      true
    ).setOrigin(0);
    this.airConditioners.add(airConditioner);
    airConditioner.setPosition(x, y - 18);
  }
}