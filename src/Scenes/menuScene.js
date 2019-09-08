
var button

export default class menuScene extends Phaser.Scene {
    constructor() {
        super({ key: "menuScene" });
    }

    preload() {
        
    }
    create(){
        button = this.add.text(20,300, 'START GAME', {
            fontSize: '30px',
            fill: '#FFFFFF'
        })

        button.setInteractive().on("pointerover", () => {
            document.body.style.cursor = "pointer";
            button.alpha = 1;
        }).on("pointerout", () => {
            document.body.style.cursor = "auto";
            button.alpha = 0.5;
        }).on("pointerdown", () => {
            document.body.style.cursor = "auto";

            this.scene.start("gameScene");
        });

    }
    update(){

    }
}