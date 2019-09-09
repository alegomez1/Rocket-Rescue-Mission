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
let bigAsteroids
let smallAsteroids
let fuel = 1500
let totalSaved = 0
let onPlatform = false
let gameOver = false
let fuelText;
let savedText;
let healthText;
let gameOverText;
let astronaut
let fuelCans
var emmiter
let astroPosition = 0
let music
let refuel
let crash1
let femaleThanks
let maleThanks
let maleThanks2
let healthSound
var randomNum
var damageCounter = 0;
let healthPacks



function preload() {
    this.load.image('rocket', "./images/RocketSprite2.png")
    this.load.image('rocketD1', './images/RocketSpriteD1.png')
    this.load.image('rocketD2', './images/RocketSpriteD2.png')
    this.load.image('rocketD3', './images/RocketSpriteD3.png')
    this.load.image('rocketD4', './images/RocketSpriteD4.png')
    this.load.image('platform', "./images/landingPad.png")
    this.load.image('asteroid', './images/asteroid.png')
    this.load.image('smoke', './images/smoke.png')
    this.load.image('astronaut', './images/astronaut.png')
    this.load.image('fuelCan', './images/fuel.png')
    this.load.image('healthPack', './images/healthPack.png')
    this.load.audio("ambient", "./Music/Ambient Space Music - Exoplanet.mp3")
    this.load.audio("refuel", "./Music/Refuel.wav")
    this.load.audio("rocketSound", "./Music/RTrim2.wav")
    this.load.audio("femaleThanks", './Music/FemaleThanks.mp3')
    this.load.audio("maleThanks", './Music/MaleThanks.wav')
    this.load.audio("maleThanks2", './Music/MaleThanks2.wav')
    this.load.audio("crash1", './Music/Crash1.wav')
    this.load.audio("healthSound", './Music/Pickup.wav')

    this.load.multiatlas('rocket2', './images/RocketSheet.json', 'images')

}

function create() {
    //Music
    music = this.sound.add("ambient")
    refuel = this.sound.add("refuel")
    rocketSound = this.sound.add("rocketSound")
    femaleThanks = this.sound.add('femaleThanks')
    maleThanks = this.sound.add('maleThanks')
    maleThanks2 = this.sound.add('maleThanks2')
    crash1 = this.sound.add("crash1")
    healthSound = this.sound.add('healthSound')
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

    // this.physics.add.sprite(35, 250, 'rocket2', 'RocketSpriteD4.png')
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.setSize(24, 25)
    player.setScale(1.3)
    player.setDrag(1000);
    player.setAngularDrag(900);
    player.setMaxVelocity(600);
    player.angle = -90
    //Astronaut
    astronaut = this.physics.add.group()
    //Health Packs
    healthPacks = this.physics.add.group()
    //Asteroids
    bigAsteroids = this.physics.add.group()
    smallAsteroids = this.physics.add.group()
    //Fuel Cans
    fuelCans = this.physics.add.group()
    //Collision Physics
    this.physics.add.collider(player, rocketPad)
    //Cursors
    cursors = this.input.keyboard.createCursorKeys();
    //Functions
    createAsteroid()
    createFuel()
    createAstronauts()
    createHealthPack()
    //Adding Text
    fuelText = this.add.text(16, 16, '', {
        fontSize: '32px',
        fill: '#FFFFFF'
    });
    savedText = this.add.text(800, 16, '', {
        fontSize: '32px',
        fill: '#FFFFFF'
    })
    healthText = this.add.text(16, 80, '', {
        fontSize: '32px',
        fill: '#FFFFFF'
    })
    gameOverText = this.add.text(400, 300, '', {
        fontSize: '90px',
        fill : '#FFFFFF'
    })



}

function update() {
    //Adds overlap physics to player and fuelcans
    this.physics.add.overlap(player, fuelCans, collectFuel, null, this);
    this.physics.add.overlap(player, astronaut, rescue, null, this);
    this.physics.add.overlap(player, bigAsteroids, crashBig, null, this);
    this.physics.add.overlap(player, smallAsteroids, crashSmall, null, this);
    this.physics.add.overlap(player, healthPacks, collectHealthPack, null, this);

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
        
    } else if (cursors.right.isDown && fuel > 0) {
        rocketSound.play(rocketConfig)
        rocketSound.stop(rocketConfig)
        // player.setVelocityX(160)
        player.setAngularVelocity(200);
        
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

    //Changing Text
    fuelText.text = 'Fuel: ' + fuel + ' units'
    savedText.text = 'Astronauts Rescued: ' + totalSaved

    //Random Number Generating
    randomNum = Phaser.Math.Between(0, 2)

    if (damageCounter == 0){
        player.setTexture('rocket')
        healthText.text = 'Health: 100%'

    }else if (damageCounter == 1){
        player.setTexture('rocketD1')
        healthText.text = 'Health: 75%'

    }else if (damageCounter == 2){
        player.setTexture('rocketD2')
        healthText.text = 'Health: 50%'

    }else if (damageCounter == 3){
        player.setTexture('rocketD3')
        healthText.text = 'Health: 25%'

    }
    else if (damageCounter == 4){
        player.setTexture('rocketD4')
        healthText.text = 'Health: 1%'

    }else if (damageCounter > 4){
        gameOverText.text = "Game Over"
        bigAsteroids.destroy()
        smallAsteroids.destroy()
        healthPacks.destroy()
        fuelCans.destroy()
        player.destroy()
    }

    if(totalSaved == 5){
        gameOverText.text = "You Won!"
        player.destroy()
    }

}
function createAstronauts() {
    setInterval(function () {
        var strandedAstronaut = astronaut.create(1450, Phaser.Math.Between(0, 700), 'astronaut')
        strandedAstronaut.body.allowGravity = false
        strandedAstronaut.setScale(.4)
        strandedAstronaut.setVelocity(-300, 0)
    }, 2500)
}
function rescue(player, strandedAstronaut) {
    var ladyConfig = {
        mute: false,
        volume: 9,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }
    if (randomNum == 0) {
        femaleThanks.play(ladyConfig)
    } else if (randomNum == 1) {
        maleThanks.play()
    } else if (randomNum == 2) {
        maleThanks2.play()
    }
    strandedAstronaut.destroy(strandedAstronaut.x, strandedAstronaut.y)
    totalSaved += 1
}
function createAsteroid() {
    setInterval(function () {
        var rock = bigAsteroids.create(1390, Phaser.Math.Between(0, 700), 'asteroid')
        rock.body.immovable = true
        rock.body.allowGravity = false
        rock.setVelocity(-200, 0)
        rock.angle = Phaser.Math.Between(-180, 180)
        rock.setScale(1)

        var tinyRock = smallAsteroids.create(1390, Phaser.Math.Between(0, 700), 'asteroid')
        tinyRock.body.immovable = true
        tinyRock.body.allowGravity = false
        tinyRock.setVelocity(-100, 0)
        tinyRock.angle = Phaser.Math.Between(-180, 180)
        tinyRock.setScale(.5)
    }, 500)
}
function crashSmall(player, rock) {
    crash1.play()
    rock.destroy(rock.x, rock.y)
    damageCounter += 1
}
function crashBig(player, rock) {

    crash1.play()
    rock.destroy(rock.x, rock.y)
    damageCounter += 2
}
function createFuel() {
    setInterval(function () {
        var can = fuelCans.create(1390, Phaser.Math.Between(0, 700), 'fuelCan')
        can.body.allowGravity = false
        can.setVelocity(-200, 0)
        can.setScale(.9)
    }, 2000)
}
function collectFuel(player, can) {
    refuel.play()
    var test = this.add.text(can.x - 5, can.y - 5, '+500')
    can.destroy(can.x, can.y)
    fuel += 500

    setTimeout(function () {
        test.destroy()
    }, 500)
}
function createHealthPack(){
    setInterval(function(){
        var pack = healthPacks.create(1390, Phaser.Math.Between(0,700), 'healthPack')
        pack.body.allowGravity = false
        pack.setVelocity(-250, 0)
        pack.setScale(.7)

    },2000)
}
function collectHealthPack(player, pack){
    healthSound.play()
    pack.destroy(pack.x, pack.y)
    if(damageCounter>0){
        damageCounter -= 1
    }
}
console.log('Compiled')




// function floatingAstronaut() {
//     //Moving Astronaut up and down
//     if (astroPosition < 490) {
//         astronaut.y += .8;
//         astronaut.angle += .5
//         astroPosition += 1
//         //console.log(astroPosition, '1')
//     }
//     if (astroPosition >= 490) {
//         astronaut.y -= .8
//         astronaut.angle += .5
//         astroPosition += 1
//         //console.log(astroPosition, '2')
//     }
//     if (astroPosition >= 900) {
//         astroPosition = 10
//         //console.log(astroPosition, '3')
//     }
// }