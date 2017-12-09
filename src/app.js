import * as pageRenderer from "./page-renderer/page-renderer";
import { screenSettings } from "./settings/settings";
import * as grid from "./responsive-square-grid/responsive-square-grid"
import { renderGrid } from "./responsive-square-grid/responsive-square-grid";

const createCanvas = () => {
    const canvas = pageRenderer.fixedCanvas(screenSettings.screenWidth, screenSettings.screenHeight);
    pageRenderer.initCanvas(canvas);
    return canvas;
}

const canvas = createCanvas();
grid.renderGrid(canvas);

const mouseEventRenderer = () => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    grid.select(x, y);
    renderGrid(canvas);
}

document.body.addEventListener('mousemove', mouseEventRenderer, true); 