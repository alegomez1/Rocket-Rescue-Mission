const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
})
//Declare Objects Here
let player

function preload() {
    game.load.image('ground', "images/Generic RPG Sprites/rpg-pack/tiles/generic-rpg-Slice.png")
    game.load.spritesheet('woof', 'images/woof.png', 32, 32)
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    grass = game.add.group()
    // I think this adds collision detection
    grass.enableBody = true

    let ground = grass.create(0, 0, 'ground')
    ground.scale.setTo(200, 200)
    ground.body.immovable = true

    player = game.add.sprite(32, game.world.height - 150, 'woof')
    game.physics.arcade.enable(player)
    //Controls bouncing upon hitting ground
    player.body.bounce.y = .2
    //Rate of decent
    player.body.gravity.y = 800
    //Stops player from falling||Allows it to stay within world bounds
    player.body.collideWorldBounds = true

    //Sprite Animations
    player.animations.add('left', [0, 1], 8, true)
    player.animations.add('right', [2, 3], 8, true)
}

function update() {

}