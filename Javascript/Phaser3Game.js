/** @type {import("../Typings/phaser*/

// import {LoadScene} from "./scenes/LoadScene";
// import {MenuScene} from "./scenes/MenuScene";

console.log("Working")

var config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 500,
    scene: {
        preload: preload,
        create: create
    }
}

var game = new Phaser.Game(config);

function preload(){

}

function create() {

}