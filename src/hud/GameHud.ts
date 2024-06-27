import { Scene } from "phaser";
import { Tower } from "../entities/Tower";

export class GameHud extends Scene {
  private txtFloor: Phaser.GameObjects.Text;
  private currentFloor: number;
  private tower: Tower;

  constructor() {
    super("GameHud");
  }

  setVisible(visible: boolean) {
    this.txtFloor.setVisible(visible);
  }

  setTower(tower: Tower) {
    this.tower = tower;
  }

  create() {
    this.txtFloor = this.add.text(20, 20, "Piso: 11", {
      fontFamily: "half_bold_pixel",
      fontSize: "48px",
      color: "#FFFFFF",
      backgroundColor: "black",
      padding: {
        x: 20,
        y: 20
      }
    }).setVisible(false);
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