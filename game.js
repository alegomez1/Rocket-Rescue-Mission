const game = new Phaser.Game(1300, 500, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update,
  render: render
})

let player
let platforms
let asteroids
let fuel = 20000
let onPlatform = false
let gameOver = false
let rock
var emmiter



function preload() {
  game.load.image('rocket', "images/RocketSprite.png")
  game.load.image('platform', "images/landingPad.png")
  game.load.image('asteroid', 'images/asteroid.png')
  game.load.image('smoke', 'images/smoke.png')
  game.load.image('orangeSmoke', 'images/orangeSmoke.png')

}

function create() {
  game.physics.startSystem(Phaser.Physics.Arcade);
  player = game.add.sprite(0, 500, 'rocket')
  game.physics.arcade.enable(player)
  //Controls bouncing upon hitting ground
  player.body.bounce.y = .2
  //Rate of decent
  player.body.gravity.y = 800
  //Stops player from falling||Allows it to stay within world bounds
  player.body.collideWorldBounds = true

  platforms = game.add.group()
  platforms.enableBody = true
  platforms.create(100,300, 'platform').body.immovable = true
  platforms.create(300,400, 'platform').body.immovable = true
  platforms.create(500,100, 'platform').body.immovable = true

  asteroids = game.add.group()
  asteroids.enableBody = true
  
  game.physics.arcade.enable(asteroids)
  game.physics.arcade.collide(player, asteroids)


  game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);


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


createAsteroid()


}

function update() {

  game.physics.arcade.collide(player, platforms)
  //Player's movement along x-axis||Can be altered to simulate wind blowing conditions
  player.body.velocity.x = 0


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
    emitter.emitX = player.x+17;
    emitter.emitY = player.y+40;
    fuel -= 1
  } else {
    player.animations.stop()
    emitter.emitX = -200
    emitter.emitY = -500
  }

  fuelText.text = 'Fuel: ' + fuel


  //Adding fuel
  if(player.body.touching.down && onPlatform == false){
    console.log("touch")
    fuel += 100
    onPlatform = true
  }else if(player.body.touching.down && onPlatform == true){
    onPlatform = false
  }
  game.physics.arcade.collide(player, asteroids)




checkGameOver()

}

function render() {


}



function createAsteroid(){

    setInterval(function(){
       rock = asteroids.create(1400, Math.floor(Math.random() * 500), 'asteroid') 
      rock.body.gravity.x = -100
    }, 500)

    
}

function checkGameOver(){

  if(player.overlap(asteroids) && (gameOver != true)){

    console.log("HIT SPACE ROCK")
    
    gameOver = true

}

}