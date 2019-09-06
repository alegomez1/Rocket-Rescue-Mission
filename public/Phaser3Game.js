/** @type {import("../Typings/phaser*/

// import {LoadScene} from "./scenes/LoadScene";
// import {MenuScene} from "./scenes/MenuScene";


var config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500},
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
let rocketPad
let asteroids
let fuel = 10000
let onPlatform = false
let gameOver = false
let fuelText;
let astronaut
let fuelCans
var emmiter
let astroPosition = 0

function preload(){
    this.load.image('rocket', "./images/RocketSprite.png")
    this.load.image('platform', "./images/landingPad.png")
    this.load.image('asteroid', './images/asteroid.png')
    this.load.image('smoke', './images/smoke.png')
    this.load.image('astronaut', './images/astronaut.png')
    this.load.image('fuelCan', './images/fuel.png')
}

function create() {

    //Player(Rocket)
    player = this.physics.add.sprite(35, 250, 'rocket')
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    //Astronaut
    astronaut = this.physics.add.sprite(1200, 0, 'astronaut')
    astronaut.setScale(.5)
    astronaut.body.allowGravity = false
    //Platform
    rocketPad = this.physics.add.sprite(35, 290, 'platform')
    rocketPad.body.allowGravity = false;
    rocketPad.body.immovable = true;
    //Asteroids
    asteroids = this.physics.add.group()
    //Fuel Cans
    fuelCans = this.physics.add.group()
    //Collision Physics
    this.physics.add.collider(player, rocketPad)
    this.physics.add.collider(player, asteroids)
    //Cursors
    cursors = this.input.keyboard.createCursorKeys();
    //Functions
    createAsteroid()
    createFuel()
    //Adding Text
     fuelText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#FFFFFF' });
}

function update(){
    //Adds overlap physics to player and fuelcans
    this.physics.add.overlap(player, fuelCans, collectFuel, null, this);

    //Movement
    if(cursors.left.isDown && fuel>0){
        player.setVelocityX(-160);
        fuel --
    }
    else if(cursors.right.isDown && fuel>0){
        player.setVelocityX(160)
        fuel --
    }
    else{
        player.setVelocityX(0)
    }
    if(cursors.up.isDown && fuel>0){
        player.setVelocityY(-200)
        fuel --
        
    }

    //Functions
    floatingAstronaut()
    

    //Changing Text
    fuelText.text = 'Fuel: ' + fuel + ' units'

    
}
function createAsteroid(){
 
    setInterval(function(){
        var rock = asteroids.create(1390, Phaser.Math.Between(0,700), 'asteroid')
        rock.body.immovable = true
        rock.body.allowGravity = false
        rock.setVelocity(-300, 0)
    }, 100)

}
function createFuel(){
    setInterval(function(){
        var can = fuelCans.create(1390, Phaser.Math.Between(0,700), 'fuelCan')
        can.body.allowGravity = false
        can.setVelocity(-200, 0)
    }, 2000)
}
function collectFuel(player, can){
    can.destroy(can.x, can.y)
    fuel+=500

}

function floatingAstronaut(){
    //Moving Astronaut up and down
if(astroPosition < 490){
    astronaut.y += .8;
    astronaut.angle +=.5
    astroPosition += 1
    //console.log(astroPosition, '1')
  }
  if(astroPosition >= 490){
    astronaut.y -= .8
    astronaut.angle +=.5
    astroPosition += 1
    //console.log(astroPosition, '2')
  }
  if(astroPosition >= 900){
    astroPosition = 10
    //console.log(astroPosition, '3')
  }
}

console.log('Compiled')