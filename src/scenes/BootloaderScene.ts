import { Scene } from "phaser";
import PlayerPng from "../assets/sprites/player/player.png";
import PlayerJson from "../assets/sprites/player/player.json";
import TowerPng from "../assets/sprites/tower/tower.png";
import FiremanPng from "../assets/sprites/fireman/fireman.png";
import ConstructorPng from "../assets/sprites/constructor/constructor.png";
import BucketPng from "../assets/sprites/bucket/bucket.png";

export class BootloaderScene extends Scene {
  constructor() {
    super("BootloaderScene");
  }

  preload() {
    this.load.aseprite("player", PlayerPng, PlayerJson);
    this.load.image("tower", TowerPng);
    this.load.image("fireman", FiremanPng);
    this.load.image("constructor", ConstructorPng);
    this.load.image("bucket", BucketPng);
    this.load.once("complete", () => this.scene.start("StartScene"));
  }

  create() {
  }
}