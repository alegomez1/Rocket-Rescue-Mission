/** @type {import("../Typings/phaser*/

// import {LoadScene} from "./scenes/LoadScene";
// import {MenuScene} from "./scenes/MenuScene";

window.onload = function () {
    var context = new AudioContext();
    context.resume()

}




var config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {

            },
            debug: true
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
let fuel = 500
let totalSaved = 0
let onPlatform = false
let gameOver = false
let fuelText;
let savedText;
let astronaut
let fuelCans
var emmiter
let astroPosition = 0
let music
let pickup
let rocketSound
let femaleThanks
let maleThanks
let maleThanks2
var randomNum


function preload() {
    this.load.image('rocket', "./images/RocketSprite2.png")
    this.load.image('platform', "./images/landingPad.png")
    this.load.image('asteroid', './images/asteroid.png')
    this.load.image('smoke', './images/smoke.png')
    this.load.image('astronaut', './images/astronaut.png')
    this.load.image('fuelCan', './images/fuel.png')
    this.load.audio("ambient", "./Music/Ambient Space Music - Exoplanet.mp3")
    this.load.audio("pickup", "./Music/Pickup.wav")
    this.load.audio("rocketSound", "./Music/RTrim2.wav")
    this.load.audio("femaleThanks", './Music/FemaleThanks.mp3')
    this.load.audio("maleThanks", './Music/MaleThanks.wav')
    this.load.audio("maleThanks2", './Music/MaleThanks2.wav')

}

function create() {
    //Music
    music = this.sound.add("ambient")
    pickup = this.sound.add("pickup")
    rocketSound = this.sound.add("rocketSound")
    femaleThanks = this.sound.add('femaleThanks')
    maleThanks = this.sound.add('maleThanks')
    maleThanks2 = this.sound.add('maleThanks2')
    var musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    }
    music.play(musicConfig)

    //Player(Rocket)
    player = this.physics.add.sprite(35, 250, 'rocket')
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.setSize(24, 25)
    player.setDrag(1000);
    player.setAngularDrag(900);
    player.setMaxVelocity(600);
    player.angle = -90
    //Astronaut
    // astronaut = this.physics.add.sprite(1200, 0, 'astronaut')
    // astronaut.setScale(.5)
    astronaut = this.physics.add.group()
    //Platform
    rocketPad = this.physics.add.sprite(35, 290, 'platform')
    rocketPad.body.allowGravity = false;
    rocketPad.body.immovable = true;
    rocketPad.setSize(75, 10) //Alters hitbox
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
    createAstronauts()
    //Adding Text
    fuelText = this.add.text(16, 16, '', {
        fontSize: '32px',
        fill: '#FFFFFF'
    });
    savedText = this.add.text( 800, 16, '', {
        fontSize: '32px',
        fill: '#FFFFFF'
    })

}

function update() {
    //Adds overlap physics to player and fuelcans
    this.physics.add.overlap(player, fuelCans, collectFuel, null, this);
    this.physics.add.overlap(player, astronaut, rescue, null, this);
    var rocketConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }

    //Movement
    if (cursors.left.isDown && fuel > 0) {
        rocketSound.play(rocketConfig)
        rocketSound.stop(rocketConfig)
        // player.setVelocityX(-160);
        player.setAngularVelocity(-200);
        fuel--
    } else if (cursors.right.isDown && fuel > 0) {
        rocketSound.play(rocketConfig)
        rocketSound.stop(rocketConfig)
        // player.setVelocityX(160)
        player.setAngularVelocity(200);
        fuel--
    } else {
        player.setAngularVelocity(0);
    }

    if (cursors.up.isDown && fuel > 0) {
        rocketSound.play(rocketConfig)
        rocketSound.stop(rocketConfig)
        // player.setVelocityY(-200)
        this.physics.velocityFromRotation(player.rotation, 300, player.body.acceleration);
        fuel--

    } else {
        player.setAcceleration(0)
    }
    //Functions
    // floatingAstronaut()

    //Changing Text
    fuelText.text = 'Fuel: ' + fuel + ' units'
    savedText.text = 'Astronauts Rescued: ' + totalSaved

        //Random Number Generating
        randomNum = Phaser.Math.Between(0,2)

}
function createAstronauts(){
    setInterval(function(){
        var strandedAstronaut = astronaut.create(1450, Phaser.Math.Between(0, 700), 'astronaut')
        strandedAstronaut.body.allowGravity = false
        strandedAstronaut.setScale(.4)
        strandedAstronaut.setVelocity(-300, 0)
    }, 5000)
}
function rescue(player, strandedAstronaut){
    var ladyConfig = {
        mute: false,
        volume: 9,
        rate: 1,
        detune: 0, 
        seek: 0,
        loop: false,
        delay: 0
    }
    if(randomNum == 0){
        femaleThanks.play(ladyConfig)
    }else if(randomNum == 1){
        maleThanks.play()
    }else if(randomNum == 2){
        maleThanks2.play()
    }
    strandedAstronaut.destroy(strandedAstronaut.x, strandedAstronaut.y)
    totalSaved += 1
}
function createAsteroid() {
    setInterval(function () {
        var rock = asteroids.create(1390, Phaser.Math.Between(0, 700), 'asteroid')
        rock.body.immovable = true
        rock.body.allowGravity = false
        rock.setVelocity(-300, 0)
        rock.angle = Phaser.Math.Between(-180, 180)
    }, 500)
}
function createFuel() {
    setInterval(function () {
        var can = fuelCans.create(1390, Phaser.Math.Between(0, 700), 'fuelCan')
        can.body.allowGravity = false
        can.setVelocity(-200, 0)
    }, 2000)
}
function collectFuel(player, can) {
    pickup.play()
    can.destroy(can.x, can.y)
    fuel += 500
}
function floatingAstronaut() {
    //Moving Astronaut up and down
    if (astroPosition < 490) {
        astronaut.y += .8;
        astronaut.angle += .5
        astroPosition += 1
        //console.log(astroPosition, '1')
    }
    if (astroPosition >= 490) {
        astronaut.y -= .8
        astronaut.angle += .5
        astroPosition += 1
        //console.log(astroPosition, '2')
    }
    if (astroPosition >= 900) {
        astroPosition = 10
        //console.log(astroPosition, '3')
    }
}
console.log('Compiled')