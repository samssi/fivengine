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
    grid.mouseSelect(x, y);
    renderGrid(canvas);
}

const aiEventRenderer = () => {
    setInterval(() => {
        grid.aiMove();
        renderGrid(canvas);
    }, 170);
}

aiEventRenderer();

document.body.addEventListener('mousemove', mouseEventRenderer, true); 