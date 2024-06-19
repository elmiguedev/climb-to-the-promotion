import { Scene } from "phaser";
import { Player } from "../entities/Player";
import { Tower } from "../entities/Tower";

export class GameHud extends Scene {
  private txtFloor: Phaser.GameObjects.Text;
  private currentFloor: number;
  private tower: Tower;

  constructor() {
    super("GameHud");
  }

  setTower(tower: Tower) {
    this.tower = tower;
  }

  create() {
    this.txtFloor = this.add.text(20, 20, "Piso: 11", {
      fontFamily: "half_bold_pixel",
      fontSize: "48px",
      color: "#FFFFFF",
    })
  }

  update(): void {
    const floor = this.tower.getPlayerFloor();
    if (this.currentFloor < floor) {
      this.sound.play("floor");
    }
    this.currentFloor = floor;
    this.txtFloor.text = `Piso: ${this.currentFloor}`;
  }
}