import * as pageRenderer from "./page-renderer/page-renderer";
import { screenSettings } from "./settings/settings";
import { renderGrid } from "./square-grid/square-grid"

const createCanvas = () => {
    const canvas = pageRenderer.fixedCanvas(screenSettings.screenWidth, screenSettings.screenHeight);
    pageRenderer.initCanvas(canvas);
    return canvas;
}

const draw = (canvas) => {
    const context = canvas.getContext("2d");
    context.fillStyle = screenSettings.bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    return context;
}

const canvas = createCanvas();
//setInterval(() => { draw(canvas);}, 1000);

const context = draw(canvas);
renderGrid(context);

