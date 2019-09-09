
// window.onload = function () {
//     var context = new AudioContext();
//     context.resume()
// }


var button
import rocketTEXT from '../Assets/Images/RocketSprite2.png'

// import myMusic from '../Assets/Sound/Pickup.wav'


let image


export default class menuScene extends Phaser.Scene {
    constructor() {
        super({ key: "menuScene" });
    }

    preload() {
        this.load.image('rocket', rocketTEXT)
        image = this.physics.add.group()





    }
    create(){
 //How to play Section
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
        //Mission Section
        this.add.text(750, 16, 'Mission Objective', {
            fontSize: "50px",
            fill: "#FFFFFF",
        })
        this.add.text(725, 100, "- Rescue 5 astronauts", {
            fontSize: "20px",
            fill: "#FFFFFF",
        })
        this.add.text(725, 150, "- Avoid incoming asteroids", {
            fontSize: "20px",
            fill: "#FFFFFF",
        })

        //Start Game Button
        button = this.add.text(400,450, 'START GAME', {
            fontSize: '80px',
            fill: '#FFFFFF'
        })
        var newRocket = image.create(button.x -50, button.y+45, 'rocket')
        newRocket.alpha = 0
        newRocket.setScale(2)
        
        button.alpha = 0.5;
        button.setInteractive().on("pointerover", () => {
            document.body.style.cursor = "pointer";
            button.alpha = 1;
            
            newRocket.alpha = 1
        }).on("pointerout", () => {
            document.body.style.cursor = "auto";
            button.alpha = 0.5;
            newRocket.alpha = 0
        }).on("pointerdown", () => {
            document.body.style.cursor = "auto";

            this.scene.start("gameScene");
        });

    }
    update(){

    }
}