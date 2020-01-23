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

class Rect extends DrawingObj {
    constructor(posX, posY, fillColor, w, h) {
        super(posX, posY, "rect", fillColor);

        this.w = w;
        this.h = h;
    }
}

const paintController = {
    paintStack: [],
    drawingState: "NO_TOOL",
    draw: function (ctx) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

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

rectBtn.addEventListener("click", (e) => {
    console.log(paintController.drawingState = (paintController.drawingState === "NO_TOOL") ? "RECT_STATE_1" : "NO_TOOL");
})



