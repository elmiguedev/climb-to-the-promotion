import { TOWER_DEPTH } from "../utils/Constants";
import { AirConditioner } from "./AirConditioner";
import { Constructor } from "./Constructor";
import { Fireman } from "./Fireman";
import { Player } from "./Player";

export class Tower {
  private FLOOR_LENGTH = 30;
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
        this.y - (this.FLOOR_HEIGHT * i),
        i
      );
    }
  }

  private createFloor(x: number, y: number, floorNumber: number) {
    // crea el fondo del piso
    const floor = this.scene.add.image(x, y, "tower");
    floor.setOrigin(0.5, 1);
    floor.setScale(4);
    floor.setDepth(TOWER_DEPTH)

    // crea los enemigos
    this.createConstructor(x, y);


    if (floorNumber > 10) {
      this.createAirConditioner(x, y);

    }

    if (floorNumber < 27) {

    }

    if (floorNumber === 28) {

    }

  }

  private createConstructor(x: number, y: number) {
    const rnd = Phaser.Math.Between(1, 5)
    const positionRnd = Phaser.Math.Between(0, 1)
    const xConstructor = positionRnd === 0 ? -60 : 230
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
      if (Math.random() > 0.6) {
        constructor.createBucket('center');

      }
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

  private createFiremen() {
    this.scene.time.addEvent({
      delay: 4000,
      loop: true,
      callback: () => {
        const x = Phaser.Math.Between(100, 500)
        const fireman = new Fireman(this.scene, x, this.target.y - 600);
        fireman.fall();
        this.scene.physics.add.overlap(this.target, fireman, () => {
          this.scene.sound.play("hit");
          this.scene.scene.restart()
        })
      }
    })

  }
}