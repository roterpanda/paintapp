//Set global variables
const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

let currentFGColor = "black";
let currentBGColor = "red";

//Classes and Objects

class DrawingObj {
    constructor(posX, posY, type, fillColor) {
        this.posX = posX;
        this.posY = posY;
        this.type = type;
        this.fillColor = fillColor;
    }
}

const paintController = {
    paintStack: [],
    draw: function (ctx) {

        ctx.strokeStyle = currentFGColor;

        this.paintStack.forEach((dObj) => {
            ctx.fillStyle = dObj.fillColor;
            switch (dObj.type) {
                case "rect":
                    ctx.strokeRect(dObj.posX, dObj.posY, 60, 60);
                    ctx.fillRect(dObj.posX, dObj.posY, 60, 60);

                    break;
            }

        })
    },
    addObj: function (obj) {
        this.paintStack.push(obj);
    }
}

const rect1 = new DrawingObj(80, 5, "rect", "yellow");

console.log(paintController.addObj(rect1));

paintController.draw(ctx);


