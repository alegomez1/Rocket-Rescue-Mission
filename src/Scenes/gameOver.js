import menuScene from "./menuScene";

class gameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameOver'
        });
    }
    preload(){

    }
    create(){
        this.add.text(400, 200, 'Game Over', {
            fontSize: '30px',
            fill: '#FFFFFF'
        })
    }
    update(){

    }

}


export default gameScene