const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
})
//Declare Objects Here



function preload() {
game.load.image('ground', "images/Generic RPG Sprites/rpg-pack/tiles/generic-rpg-Slice.png")

}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);


    grass = game.add.group()
    // I think this adds collision detection
    grass.enableBody = true

    let ground = grass.create(0,0, 'ground')
    ground.scale.setTo(200, 200)
    ground.body.immovable = true
}


function update(){

}