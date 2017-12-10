import * as pageRenderer from "./page-renderer/page-renderer";
import { screenSettings } from "./settings/settings";
import * as grid from "./responsive-square-grid/responsive-square-grid"
import * as freeRoaming from "./responsive-square-grid/ai-behaviors/free-roaming"
import * as borderSneaking from "./responsive-square-grid/ai-behaviors/border-sneaking"
import * as state from "./responsive-square-grid/state"

const createCanvas = () => {
    const canvas = pageRenderer.fixedCanvas(screenSettings.screenWidth, screenSettings.screenHeight);
    pageRenderer.initCanvas(canvas);
    return canvas;
}

const canvas = createCanvas();
grid.renderGrid(canvas);

const mouseMoveEvent = () => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    grid.mouseSelect(x, y);
    grid.renderGrid(canvas);
}

const mouseClickEvent = () => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    state.selection.aiColumn = grid.mouseColumn(y);
    state.selection.aiRow = grid.mouseRow(x);
}

const aiEventRenderer = () => {
    setInterval(() => {
        borderSneaking.aiMove();
        grid.renderGrid(canvas);
    }, 200);
}

aiEventRenderer();

document.body.addEventListener('mousemove', mouseMoveEvent, true); 
document.body.addEventListener('click', mouseClickEvent, true); 