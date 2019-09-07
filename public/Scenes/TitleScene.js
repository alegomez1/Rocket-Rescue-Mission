class TitleScene extends Phaser.Scene {
    constructor(){
        super({key: "TitleScene"})
    }
    preload(){
        this.load.image('sky', '../images/sky.png')
    }
    create(){
        let bg = this.add.sprite(0, 0, 'bg')
        bg.setOrigin(0,0)
    }
}

export default TitleScene;