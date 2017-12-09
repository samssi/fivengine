import * as pageRenderer from "./page-renderer/page-renderer";
import { screenSettings } from "./settings/settings";
import * as grid from "./responsive-square-grid/responsive-square-grid"

const createCanvas = () => {
    const canvas = pageRenderer.fixedCanvas(screenSettings.screenWidth, screenSettings.screenHeight);
    pageRenderer.initCanvas(canvas);
    return canvas;
}

const createContext = (canvas) => {
    const context = canvas.getContext("2d");
    context.fillStyle = screenSettings.bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    return context;
}

const canvas = createCanvas();
const context = createContext(canvas);
grid.renderGrid(context);

const mouseClick = () => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    grid.select(x, y);
}

document.body.addEventListener('click', mouseClick, true); 