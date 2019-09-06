import { CST } from "../CST"
 
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    create(){
        this.scene.start(CST.SCENES.MENU, "Hello from Load Scene")
    }
}