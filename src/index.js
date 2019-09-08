import Phaser from "phaser";
import gameScene from "./Scenes/gameScene"
import menuScene from "./Scenes/menuScene";
import gameOver from "./Scenes/gameOver"

var config = {
  type: Phaser.AUTO,
  width: 1300,
  height: 700,
  pixelart: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: 0,
      debug: false
    }
  },
  scene: [menuScene, gameScene, gameOver]
};

var game = new Phaser.Game(config);