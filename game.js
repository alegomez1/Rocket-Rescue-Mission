const game = new Phaser.Game(1300, 500, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
})

let player

function preload(){
  game.load.image('rocket', "images/RocketSprite.png")

}

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);
  player = game.add.sprite(0, 0, 'rocket')

  game.physics.arcade.enable(player)
  //Controls bouncing upon hitting ground
  player.body.bounce.y = .2
  //Rate of decent
  player.body.gravity.y = 800
  //Stops player from falling||Allows it to stay within world bounds
  player.body.collideWorldBounds = true
}

function update(){
  
}