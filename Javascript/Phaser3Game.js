/** @type {import("../Typings/phaser*/

// import {LoadScene} from "./scenes/LoadScene";
// import {MenuScene} from "./scenes/MenuScene";

console.log("Working")

var config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);

let player
let platforms
let asteroids
let fuel = 600
let onPlatform = false
let gameOver = false
let rock
let astronaut
let fuelCan
var emmiter
let astroPosition = 0

function preload(){
    this.load.image('rocket', "images/RocketSprite.png")
    this.load.image('platform', "images/landingPad.png")
    this.load.image('asteroid', 'images/asteroid.png')
    this.load.image('smoke', 'images/smoke.png')
    this.load.image('astronaut', 'images/astronaut.png')
    this.load.image('fuelCan', 'images/fuel.png')
}

function create() {

    player = this.physics.add.sprite(35, 350, 'rocket')
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
}

function update(){

    //Movement
    if(cursors.left.isDown){
        player.setVelocityX(-160);
    }
    else if(cursors.right.isDown){
        player.setVelocityX(160)
    }
    if(cursors.up.isDown){
        player.setVelocityY(-100)
    }
   
    
    
}

console.log('NEW')