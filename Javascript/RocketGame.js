const game = new Phaser.Game(1300, 500, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update,
})

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

function preload() {
  game.load.image('rocket', "images/RocketSprite.png")
  game.load.image('platform', "images/landingPad.png")
  game.load.image('asteroid', 'images/asteroid.png')
  game.load.image('smoke', 'images/smoke.png')
  game.load.image('orangeSmoke', 'images/orangeSmoke.png')
  game.load.image('astronaut', 'images/astronaut.png')
  game.load.image('fuelCan', 'images/fuel.png')

}

function create() {
  game.physics.startSystem(Phaser.Physics.Arcade);
  player = game.add.sprite(35, 350, 'rocket')
  game.physics.arcade.enable(player)
  //Controls bouncing upon hitting ground
  player.body.bounce.y = .2
  //Rate of decent
  player.body.gravity.y = 800
  //Stops player from falling||Allows it to stay within world bounds
  player.body.collideWorldBounds = false
  //Creates three platforms
  platforms = game.add.group()
  platforms.enableBody = true
  platforms.create(0,400, 'platform').body.immovable = true

  asteroids = game.add.group()
  asteroids.enableBody = true

  cans = game.add.group()
  cans.enableBody = true

  game.physics.arcade.enable(asteroids)
  game.physics.arcade.enable(cans)
  game.physics.arcade.collide(player, asteroids)

  emitter = game.add.emitter(player+200, player+200, 400);

  emitter.makeParticles( [ 'smoke'] );

  emitter.gravity = 200;
  emitter.setAlpha(1, 0, 3000);
  emitter.setScale(0.5, 0, 0.9, 0, 1000);

  emitter.start(false, 3000, 5);

  cursors = game.input.keyboard.createCursorKeys()
  fuelText = game.add.text(16, 16, '', {
    fontSize: '32px',
    fill: '#FFFFFF'
})

//Adding floating astronaut
astronaut = game.add.sprite(1200, 0, 'astronaut')
astronaut.scale.setTo(0.5,0.5)

//Adding Fuel Cans
fuelCan = game.add.sprite(10000, 250, 'fuelCan')

createAsteroid()
createFuelCan()
}

function update() {

  game.physics.arcade.collide(player, platforms)
  //Player's movement along x-axis||Can be altered to simulate wind blowing conditions
  player.body.velocity.x = 0

  //Emitter Speed
  var px = player.body.velocity.x;
  var py = player.body.velocity.y;

  px *= -1;
  py *= -1;
  emitter.minParticleSpeed.set(px, py);
  emitter.maxParticleSpeed.set(px, py);

  //Movement
  if (cursors.left.isDown && fuel>0) {
    player.body.velocity.x = -150
    fuel -= 1
    // player.angle +=1
  } else if (cursors.right.isDown && fuel>0) {
    player.body.velocity.x = 150
    fuel -= 1
    // player.angle +=1
  } if (cursors.up.isDown && fuel>0) {
    player.body.velocity.y = -250
    //Creates emitter underneath rocket||Can adjust position
    emitter.emitX = player.x+17;
    emitter.emitY = player.y+40;
    fuel -= 1
  } else {
    player.animations.stop()
    //Hides the emitter when not in use
    emitter.emitX = -200
    emitter.emitY = -500
  }
  //Changes text on the screen
  fuelText.text = 'Fuel: ' + fuel + ' units'

  //Adding fuel
  if(player.body.touching.down && onPlatform == false){
    console.log("touch")
   
    onPlatform = true
  }

  else if(player.body.touching.down && onPlatform == true){
    onPlatform = false
  }
  game.physics.arcade.collide(player, asteroids)
  game.physics.arcade.collide(player, astronaut)

//Astronaut's up and down movement
  float()

checkGameOver()
collectFuel()

}

function createAsteroid(){

    setInterval(function(){
       rock = asteroids.create(1490, Math.floor(Math.random() * 500), 'asteroid')
      rock.body.gravity.x = -900
    }, 100)

    
}

function checkGameOver(){

  if(player.overlap(astronaut) && (gameOver != true)){

    alert("You won!")
    
    gameOver = true
}

}
function float(){
//Moving Astronaut up and down
if(astroPosition < 490){
  astronaut.y += .8;
  astronaut.angle +=.2
  astroPosition += 1
  console.log(astroPosition, '1')
}
if(astroPosition >= 490){
  astronaut.y -= .8
  astronaut.angle +=.2
  astroPosition += 1
  console.log(astroPosition, '2')
}
if(astroPosition >= 900){
  astroPosition = 10
  console.log(astroPosition, '3')
}
}
function createFuelCan(){
  setInterval(function(){
    fuelCan = cans.create(1490, Math.floor(Math.random() * 500), 'fuelCan')
   fuelCan.body.gravity.x = -400
 }, 3000)
}
function collectFuel(){
  

  if(player.overlap(fuelCan)){
    fuel += 50
  }



}