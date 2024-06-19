import { Scene } from "phaser";
import PlayerPng from "../assets/sprites/player/player.png";
import PlayerJson from "../assets/sprites/player/player.json";
import TowerPng from "../assets/sprites/tower/tower.png";
import FiremanPng from "../assets/sprites/fireman/fireman.png";
import ConstructorPng from "../assets/sprites/constructor/constructor.png";
import BucketPng from "../assets/sprites/bucket/bucket.png";
import AirConditionerPng from "../assets/sprites/airconditioner/airconditioner.png";
import AirConditionerJson from "../assets/sprites/airconditioner/airconditioner.json";
import BgMp3 from "../assets/sounds/bg.mp3";
import FloorWav from "../assets/sounds/floor.wav";
import HitMp3 from "../assets/sounds/hit.mp3";
import MoveWav from "../assets/sounds/move.wav";

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
    this.load.aseprite("airconditioner", AirConditionerPng, AirConditionerJson);
    this.load.audio("bg", [BgMp3]);
    this.load.audio("floor", [FloorWav]);
    this.load.audio("hit", [HitMp3]);
    this.load.audio("move", [MoveWav]);
    this.load.once("complete", () => this.scene.start("StartScene"));
  }

  create() {
  }
}