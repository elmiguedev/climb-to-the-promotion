import { TOWER_DEPTH } from "../utils/Constants";
import { AirConditioner } from "./AirConditioner";
import { Constructor } from "./Constructor";
import { Fireman } from "./Fireman";
import { Globant } from "./Globant";
import { Migoya } from "./Migoya";
import { Player } from "./Player";

export class Tower {
  private FLOOR_LENGTH = 3;
  private FLOOR_HEIGHT = 180 * 4;
  private FLOOR_WIDTH = 160 * 4;
  private target: Player;
  private constructors: Phaser.Physics.Arcade.Group;
  private airConditioners: Phaser.Physics.Arcade.Group;
  private globantGroup: Phaser.Physics.Arcade.Group;
  private migoyaGroup: Phaser.Physics.Arcade.Group;

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
    this.globantGroup = this.scene.physics.add.group({
      runChildUpdate: true
    })
    this.migoyaGroup = this.scene.physics.add.group({
      runChildUpdate: true
    })
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

    this.createFiremen();
  }

  private createFloor(x: number, y: number, floorNumber: number) {
    // crea el fondo del piso
    const floor = this.scene.add.image(x, y, "tower");
    floor.setOrigin(0.5, 1);
    floor.setScale(4);
    floor.setDepth(TOWER_DEPTH)

    // crea los enemigos

    if (floorNumber < 28) {
      this.createConstructor(x, y, floorNumber);
    }

    if (floorNumber > 10 && floorNumber < 28) {
      this.createAirConditioner(x, y, floorNumber);

    }

    if (floorNumber === 28) {
      this.createGlobant(y)
    }

    if (floorNumber === this.FLOOR_LENGTH - 1) {
      this.createMigoya(y);
    }

  }

  private createConstructor(x: number, y: number, floorNumber: number) {
    const constructorRnd = Math.random();
    let constructorRndLimit = 0.1;
    if (floorNumber < 3) {
      constructorRndLimit = 0.2;
    } else if (floorNumber < 7) {
      constructorRndLimit = 0.5;
    } else if (floorNumber < 16) {
      constructorRndLimit = 0.8;
    } else if (floorNumber < 28) {
      constructorRndLimit = 0.9;
    }

    if (constructorRnd > constructorRndLimit) {
      return;
    }
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

  private createAirConditioner(x: number, y: number, floorNumber: number) {
    const xAir = Phaser.Math.Between(0, 400)
    const dropProb = floorNumber < 18 ? 0.6 : 0.1
    const airConditioner = new AirConditioner(
      this.scene,
      xAir,
      y - 18,
      this.target,
      Math.random() > dropProb
    ).setOrigin(0);
    this.airConditioners.add(airConditioner);
    airConditioner.setPosition(xAir, y - 108);
  }

  private createFiremen() {
    this.scene.time.addEvent({
      delay: 4000,
      loop: true,
      callback: () => {
        if (this.getPlayerFloor() > 19) {
          const x = Phaser.Math.Between(100, 500)
          const fireman = new Fireman(this.scene, x, this.target.y - 600);
          fireman.fall();
          this.scene.physics.add.overlap(this.target, fireman, () => {
            this.target.hit();
          })
        }
      }
    })
  }

  private createGlobant(floorY: number) {
    const x = this.scene.game.canvas.width / 2;
    const g = new Globant(this.scene, x, floorY, this.target);
    this.globantGroup.add(g);
    g.setPosition(x, floorY);
  }

  private createMigoya(y: number) {
    const x = this.scene.game.canvas.width / 2
    const migoya = new Migoya(this.scene, x, y - 200 - this.FLOOR_HEIGHT, this.target);
    this.migoyaGroup.add(migoya);
    migoya.setPosition(x + 50, y - 200 - this.FLOOR_HEIGHT);
  }

  public isLastFloor() {
    return this.target.y < -this.getHeight() + 300;
    // return this.getPlayerFloor() === this.FLOOR_LENGTH - 1
  }

}