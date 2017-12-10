import { screenSettings, gridSettings } from "../../settings/settings";
import { selection } from "../state"

const columnMax = gridSettings.horizontalBoxes - 1;
const rowMax = gridSettings.verticalBoxes - 1;
let mode = "up";

export const aiMove = () => {
    

    if (mode === "up") {
        const nextMove = selection.aiColumn - 1;
        reachedTop(nextMove) ? mode = "right" : selection.aiColumn = nextMove;
    }
    else if (mode === "right") {
        const nextMove = selection.aiRow + 1;
        reachedRight(nextMove) ? mode = "down" : selection.aiRow = nextMove;
    }
    else if (mode === "down") {
        const nextMove = selection.aiColumn + 1;
        reachedDown(nextMove) ? mode = "left" : selection.aiColumn = nextMove;
    }
    else if (mode === "left") {
        const nextMove = selection.aiRow - 1;
        reachedLeft(nextMove) ? mode = "up" : selection.aiRow = nextMove;
    }

    const nextColumnMove = selection.aiColumn + 1;
}

const reachedTop = (position) => position < 0
const reachedRight = (position) => reachedDown(position)
const reachedDown = (position) => position > columnMax
const reachedLeft = (position) => reachedTop(position)

