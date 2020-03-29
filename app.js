//Set global variables
const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

let currentFGColor = "black";
let currentBGColor = "red";

//Select tool buttons
const rectBtn = document.getElementById("rect");
const colorBGBtn = document.getElementById("BGColor");

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
    tempCoords: { x: 0, y: 0 },
    draw: function (ctx) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = currentFGColor;

        this.paintStack.forEach((dObj) => {
            ctx.fillStyle = dObj.fillColor;
            switch (dObj.type) {
                case "rect":
                    ctx.strokeRect(dObj.posX, dObj.posY, dObj.w, dObj.h);
                    ctx.fillRect(dObj.posX, dObj.posY, dObj.w, dObj.h);

                    break;
            }

        })
    },
    drawHelper: function (ctx, type, pos1, pos2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "blue";

        switch (type) {
            case "rect":

                this.draw(ctx);
                ctx.strokeRect(pos1.x, pos1.y, pos2.x - pos1.x, pos2.y - pos1.y);
                break;
        }

    },
    addObj: function (obj) {
        this.paintStack.push(obj);
    }
}

function getCanvasCoords(ex, ey) {
    return { x: ex - canvas.offsetLeft, y: ey - canvas.offsetTop };
}

//Event Listeners

rectBtn.addEventListener("click", (e) => {
    paintController.drawingState = (paintController.drawingState === "NO_TOOL") ? "RECT_STATE_1" : "NO_TOOL";
    console.log(paintController.drawingState);
})


colorBGBtn.addEventListener("input", () => {
    currentBGColor = colorBGBtn.value;
})

canvas.addEventListener("mousemove", (e) => {


    switch (paintController.drawingState) {
        case "RECT_STATE_2":

            paintController.drawHelper(ctx, "rect", paintController.tempCoords, getCanvasCoords(e.clientX, e.clientY));
            break;
    }
})

canvas.addEventListener("click", (e) => {

    switch (paintController.drawingState) {
        case "RECT_STATE_1":
            paintController.tempCoords = getCanvasCoords(e.clientX, e.clientY);
            paintController.drawingState = "RECT_STATE_2";
            break;
        case "RECT_STATE_2":
            let tempRect = new Rect(paintController.tempX,
                paintController.tempY,
                currentBGColor,
                e.clientX - canvas.offsetLeft - paintController.tempX,
                e.clientY - canvas.offsetTop - paintController.tempY);
            paintController.addObj(tempRect);
            paintController.draw(ctx);
            paintController.drawingState = "NO_TOOL";
    }

})


