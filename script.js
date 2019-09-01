console.log("Started")

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
})

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

        let groud = platforms.create(0, game.world.height - 64, 'ground')

    console.log("Create function ran")
}

function update() {}

console.log("Finished")