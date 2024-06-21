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
import GlobantPng from "../assets/sprites/globant/globant.png";
import GlobantBgPng from "../assets/sprites/globant/globant-bg.png";
import ShockPng from "../assets/sprites/globant/shock/shock.png";
import ShockJson from "../assets/sprites/globant/shock/shock.json";
import MigoyaPng from "../assets/sprites/migoya/migoya.png";
import MigoyaJson from "../assets/sprites/migoya/migoya.json";
import GlobantBulletPng from "../assets/sprites/globantbullet/globantbullet.png";

export class BootloaderScene extends Scene {
  constructor() {
    super("BootloaderScene");
  }

  preload() {
    this.load.aseprite("player", PlayerPng, PlayerJson);
    this.load.aseprite("shock", ShockPng, ShockJson);
    this.load.image("tower", TowerPng);
    this.load.image("fireman", FiremanPng);
    this.load.image("constructor", ConstructorPng);
    this.load.image("bucket", BucketPng);
    this.load.image("globant", GlobantPng);
    this.load.image("globant_bg", GlobantBgPng);
    this.load.image("globant_bullet", GlobantBulletPng);
    this.load.aseprite("migoya", MigoyaPng, MigoyaJson);
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