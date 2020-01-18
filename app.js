//Set global variables
const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

//Classes and Objects

class DrawingObj {
    constructor(posX, posY, type) {
        this.posX = posX;
        this.posY = posY;
        this.type = type;
    }
}

const paintController = {
    paintStack: [],
    draw: function (ctx) {

        this.paintStack.forEach((dObj) => {

            switch (dObj.type) {
                case "rect":
                    alert("rectangle");
                    break;
            }

        })
    },
    addObj: function (obj) {
        return this.paintStack.push(obj);
    }
}

const rect1 = new DrawingObj(5, 5, "rect");

console.log(paintController.addObj(rect1));

paintController.draw(ctx);


