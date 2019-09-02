console.log("Started")

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
})
let platforms
let player
let diamonds
let score = 0

function preload() {
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
    ground.scale.setTo(2, 2)
    ground.body.immovable = true

    //Making the ledges
    let ledge = platforms.create(400, 450, 'ground')
    ledge.body.immovable = true

    ledge = platforms.create(-75, 350, 'ground')
    ledge.body.immovable = true

    //Create Player
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

    diamonds = game.add.group()
    diamonds.enableBody = true

    //Creating Diamonds
    for (var i = 0; i < 12; i++) {
        let diamond = diamonds.create(i * 70, 0, 'diamond')
        diamond.body.gravity.y = 1000
        diamond.body.bounce.y = 0.3 + Math.random() * 0.2
    }
    //Adds text on screen which appears when the score is increased
    scoreText = game.add.text(16, 16, '', {
        fontSize: '32px',
        fill: '#000'
    })
    cursors = game.input.keyboard.createCursorKeys()



}

function update() {
    //Adding collision||Reads as 'x' will collide with 'y'
    game.physics.arcade.collide(player, platforms)
    game.physics.arcade.collide(diamonds, platforms)

    game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this)

    //Player's movement along x-axis||Can be altered to simulate wind blowing conditions
    player.body.velocity.x = 0

    //Movement
    if (cursors.left.isDown) {
        player.body.velocity.x = -150
        player.animations.play('left')
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150
        player.animations.play('right')
    } else {
        player.animations.stop()
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -450
    } 

    //Game over alert
    if(score == 120){
        alert("You win!")
        score = 0
    }
    //Code for flying/fuel game

       //Movement
    //    if (cursors.left.isDown) {
    //     player.body.velocity.x = -150
    //     player.animations.play('left')
    // } else if (cursors.right.isDown) {
    //     player.body.velocity.x = 150
    //     player.animations.play('right')
    // } else {
    //     player.animations.stop()
    // }
    // if (cursors.up.isDown && player.body.touching.down) {
    //     player.body.velocity.y = -400
    //     jumpCount -= 1
    //     console.log(jumpCount)
    // }
    // else if(cursors.up.isDown &! player.body.touching.down){
    //     player.body.velocity.y = -100
    //     jumpCount += 1
    //     console.log("second" + jumpCount)
    // }

}

function collectDiamond(player, diamond) {
    //Makes diamond dissapear
    diamond.kill()
    //Adds 10 to overall score, then changes text
    score += 10
    scoreText.text = 'Score: ' + score
}
