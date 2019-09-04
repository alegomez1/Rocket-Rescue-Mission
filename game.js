const game = new Phaser.Game(1300, 500, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
})

let player
let platforms
let fuel = 200
let onPlatform = false

function preload() {
  game.load.image('rocket', "images/RocketSprite.png")
  game.load.image('platform', "images/landingPad.png")

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
  let pad1 = platforms.create(100,300, 'platform')
  pad1.body.immovable = true






  cursors = game.input.keyboard.createCursorKeys()
  fuelText = game.add.text(16, 16, '', {
    fontSize: '32px',
    fill: '#FFFFFF'
})

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
    fuel += 75
    onPlatform = true
  }

}