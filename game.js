const game = new Phaser.Game(1300, 500, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
})

let player
let platforms
let asteroids
let fuel = 200
let onPlatform = false
let gameOver = false
let rock

function preload() {
  game.load.image('rocket', "images/RocketSprite.png")
  game.load.image('platform', "images/landingPad.png")
  game.load.image('asteroid', 'images/asteroid.png')

}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
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
  
  game.physics.arcade.collide(player, asteroids)





  cursors = game.input.keyboard.createCursorKeys()
  fuelText = game.add.text(16, 16, '', {
    fontSize: '32px',
    fill: '#FFFFFF'
})


createAsteroid()

checkGameOver()

}

function update() {

  game.physics.arcade.collide(player, platforms)
  //Player's movement along x-axis||Can be altered to simulate wind blowing conditions
  player.body.velocity.x = 0

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
    fuel -= 1
  } else {
    player.animations.stop()
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



}



function createAsteroid(){

    setInterval(function(){
      rock = asteroids.create(1400, Math.floor(Math.random() * 500), 'asteroid') 
      rock.body.gravity.x = -100
    }, 500)

    game.physics.arcade.collide(player, asteroids)
}

function checkGameOver(){
  if(player.overlap(asteroids) && (gameOver != true)){

    console.log("HIT SPACE ROCK")
    
    gameOver = true
}
}