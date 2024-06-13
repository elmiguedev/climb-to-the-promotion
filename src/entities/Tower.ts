export class Tower {
  private FLOOR_LENGTH = 6;
  private FLOOR_HEIGHT = 180 * 4;
  private FLOOR_WIDTH = 160 * 4;

  constructor(
    private scene: Phaser.Scene,
    public x: number,
    public y: number
  ) {

    this.createTower();

  }

  public getHeight() {
    return this.FLOOR_HEIGHT * this.FLOOR_LENGTH;
  }

  public getWidth() {
    return this.FLOOR_WIDTH;
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
  }

}