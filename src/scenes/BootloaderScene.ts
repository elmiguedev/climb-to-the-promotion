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
import RoarMp3 from "../assets/sounds/roar.mp3";
import BossMp3 from "../assets/sounds/boss.mp3";
import BossAttackMp3 from "../assets/sounds/bossattack.mp3";
import GameOverMp3 from "../assets/sounds/gameover.mp3";
import IorioPng from "../assets/sprites/iorio/iorio.png";
import ArgentinaPng from "../assets/sprites/argentina/argenitina.png";
import ArgentinaJson from "../assets/sprites/argentina/argenitina.json";
import SeVoMp3 from "../assets/sounds/sevo.mp3";

export class BootloaderScene extends Scene {

  private MINI_TOWER_HEIGHT = 36;
  private MAX_FLOOR_COUNT = 10;

  constructor() {
    super("BootloaderScene");
  }

  preload() {
    this.load.aseprite("player", PlayerPng, PlayerJson);
    this.load.aseprite("shock", ShockPng, ShockJson);
    this.load.aseprite("argentina", ArgentinaPng, ArgentinaJson);
    this.load.image("tower", TowerPng);
    this.load.image("fireman", FiremanPng);
    this.load.image("constructor", ConstructorPng);
    this.load.image("bucket", BucketPng);
    this.load.image("globant", GlobantPng);
    this.load.image("globant_bg", GlobantBgPng);
    this.load.image("globant_bullet", GlobantBulletPng);
    this.load.image("iorio", IorioPng);
    this.load.aseprite("migoya", MigoyaPng, MigoyaJson);
    this.load.aseprite("airconditioner", AirConditionerPng, AirConditionerJson);
    this.load.audio("bg", [BgMp3]);
    this.load.audio("floor", [FloorWav]);
    this.load.audio("hit", [HitMp3]);
    this.load.audio("move", [MoveWav]);
    this.load.audio("roar", [RoarMp3]);
    this.load.audio("boss", [BossMp3]);
    this.load.audio("bossattack", [BossAttackMp3]);
    this.load.audio("gameover", [GameOverMp3]);
    this.load.audio("sevo", [SeVoMp3]);

    this.load.on("progress", (value: number) => {
      this.createFloor(value);
    })
    this.load.once("complete", () => this.scene.start("GameScene"));
  }

  create() {
    this.cameras.main.setBackgroundColor("#70b5ee");
  }

  private createFloor(value) {
    const floor = Math.floor(value * 100 / this.MAX_FLOOR_COUNT);
    const x = this.game.canvas.width / 2;
    const baseY = this.game.canvas.height;
    const y = baseY - floor * this.MINI_TOWER_HEIGHT;

    if (floor < 10)
      this.add.image(x, y, "minitower");
    else
      this.add.image(x, y, "miniglobant");

  }
}