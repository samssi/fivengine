import * as pageRenderer from "./page-renderer/page-renderer";
import { screenSettings } from "./settings/settings";
import * as grid from "./responsive-square-grid/responsive-square-grid"
import * as freeRoaming from "./responsive-square-grid/ai-behaviors/free-roaming"
import * as borderSneaking from "./responsive-square-grid/ai-behaviors/border-sneaking"

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
    grid.renderGrid(canvas);
}

const aiEventRenderer = () => {
    setInterval(() => {
        borderSneaking.aiMove();
        grid.renderGrid(canvas);
    }, 200);
}

aiEventRenderer();

document.body.addEventListener('mousemove', mouseEventRenderer, true); 