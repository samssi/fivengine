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

let aiMode = 1;
let aiFunction = borderSneaking;

const mouseClickEventMoveToPosition = () => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    state.selection.aiColumn = grid.mouseColumn(y);
    state.selection.aiRow = grid.mouseRow(x);
}

const mouseClickEvent = () => {
    if (aiMode === 1) {
        aiFunction = freeRoaming;
        aiMode = 2;
    }
    else if (aiMode === 2) {
        aiFunction = borderSneaking;
        aiMode = 1;
    }
}

const aiEventRenderer = () => {
    setInterval(() => {
        aiFunction.aiMove();
        grid.renderGrid(canvas);
    }, 200);
}

aiEventRenderer();

document.body.addEventListener('mousemove', mouseMoveEvent, true); 
document.body.addEventListener('click', mouseClickEvent, true); 