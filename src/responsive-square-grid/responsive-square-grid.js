import * as R from "ramda";
import { screenSettings } from "../settings/settings";
import { selection } from "./state"

const verticalBoxes = 10;
const horizontalBoxes = 10;
const defaultElementWidth = screenSettings.screenWidth / horizontalBoxes;
const defaultElementHeight = screenSettings.screenHeight / verticalBoxes;

const selected = (rowElement, columnElement) => {
    return selection.row === rowElement && selection.column === columnElement;
}

const renderElement = (context, rowElement, columnElement) => {
    const left = defaultElementWidth * rowElement;
    const top = defaultElementHeight * columnElement;
    context.lineWidth = "1";
    context.strokeStyle = "blue";
    context.rect(left, top, defaultElementWidth, defaultElementHeight);
    selected(rowElement, columnElement) ? context.fillStyle = "white" : context.fillStyle = "black";
    context.fillRect(left, top, defaultElementWidth, defaultElementHeight);
    context.stroke();
}

const renderRow = (context, columnElement) => {
    R.times((rowElement) => renderElement(context, rowElement, columnElement), horizontalBoxes);
}

export const renderGrid = (context) => {
    R.times((columnElement) => renderRow(context, columnElement), verticalBoxes)
}