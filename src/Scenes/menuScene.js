
var button

export default class menuScene extends Phaser.Scene {
    constructor() {
        super({ key: "menuScene" });
    }

    preload() {
        
    }
    create(){

        //How to play section
        this.add.text(55, 16, 'How To Play', {
            fontSize: "50px",
            fill: "#FFFFFF",
        })
        this.add.text(30, 100, "- Left/Right Arrows: Turn ship left/right", {
            fontSize: "20px",
            fill: "#FFFFFF",
        })
        this.add.text(30, 150, "- Up Arrow: Move ship in that direction", {
            fontSize: "20px",
            fill: "#FFFFFF",
        })





        //Start Game Button
        button = this.add.text(1000,300, 'START GAME', {
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