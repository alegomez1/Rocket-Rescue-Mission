import gameScene from "../Scenes/gameScene"

export default class win extends Phaser.Scene {
    constructor() {
        super({
            key: 'win'
        });
    }
    preload(){

    }
    create(){
        this.add.text(445, 200, 'You won!', {
            fontSize: '80px',
            fill: '#FFFFFF'
        })
        this.add.text(350, 400, 'Refresh to play again', {
            fontSize: '50px',
            fill: '#FFFFFF'
        })
    }
    update(){

    }

}