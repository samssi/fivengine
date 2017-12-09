import * as pageRenderer from "./page-renderer/page-renderer";

const canvas = pageRenderer.renderCanvas(pageRenderer.fixedCanvas(800, 600));
const context = canvas.getContext("2d");
const color1 = "#ccffff";
const color2 = "black";

const draw = (color) => {
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
    return color;
}

let current = draw(color1);

setInterval(() => { 
    console.log(current);
    current === color1 ? current = draw(color2) : current = draw(color1);
}, 1000);
