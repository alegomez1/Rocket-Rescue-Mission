console.log("Started")

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
})
let platforms
let player
let diamonds
function preload ()
{
    game.load.image('sky', "images/sky.png");
    game.load.image('ground', 'images/platform.png');
    game.load.image('diamond', 'images/diamond.png');
    game.load.spritesheet('woof', 'images/woof.png', 32, 32)
}

function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.add.image(0, 0, 'sky') // loading sky asset

        platforms = game.add.group()
        // I think this adds collision detection
        platforms.enableBody = true

        //Making the ground
        let ground = platforms.create(0, game.world.height - 64, 'ground')
        ground.scale.setTo(2,2)
        ground.body.immovable = true

        //Making the ledges
        let ledge = platforms.create(400, 450, 'ground') 
        ledge.body.immovable = true

        ledge = platforms.create(-75, 350, 'ground')

        //Create Player
        player = game.add.sprite(32, game.world.height - 150, 'woof')
        game.physics.arcade.enable(player)
        //Controls bouncing upon hitting ground
        player.body.bounce.y = .2
        //Rate of decent
        player.body.gravity.y = 800
        //Stops player from falling||Allows it to stay within world bounds
        player.body.collideWorldBounds = true

        diamonds = game.add.group()
        diamonds.enableBody = true

        //Creating Diamonds
        for(var i=0; i<12; i++){
            let diamond = diamonds.create(i * 70, 0, 'diamond')
            diamond.body.gravity.y = 1000
            diamond.body.bounce.y = 0.3 + Math.random() * 0.2

        }



}

function update() {}

console.log("Finished")