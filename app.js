//Set global variables
const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

let currentFGColor = "black";
let currentBGColor = "red";

//Select tool buttons
const rectBtn = document.getElementById("rect");

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
    drawingState: "NO_TOOL",
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

rectBtn.addEventListener("click", () => {
    paintController.drawingState = "RECT_STATE_1";
})


paintController.draw(ctx);


