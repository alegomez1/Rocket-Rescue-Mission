import gameScene from "./gameScene";
var tryAgain

class gameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameOver'
        });
    }
    preload(){

    }
    create(){
        this.add.text(400, 200, 'Game Over', {
            fontSize: '80px',
            fill: '#FFFFFF'
        })
        tryAgain = this.add.text(350, 400, 'Refresh to try again', {
            fontSize: '50px',
            fill: '#FFFFFF'
        })


    }
    update(){

    }

}


export default gameOver