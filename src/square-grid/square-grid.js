import * as R from "ramda";
import { screenSettings } from "../settings/settings";

const verticalBoxes = 10;
const horizontalBoxes = 10;
const defaultElementWidth = screenSettings.screenWidth / horizontalBoxes;
const defaultElementHeight = screenSettings.screenHeight / verticalBoxes;

const rectDraw = (context) => {
    context.rect(20, 20, 20, 20);
    context.stroke();
}

const renderElement = (context, rowElement, columnElement) => {
    const left = defaultElementWidth * rowElement;
    const top = defaultElementHeight * columnElement;
    context.rect(left, top, defaultElementWidth, defaultElementHeight);
    context.stroke();
}

const renderRow = (context, columnElement) => {
    R.times((rowElement) => renderElement(context, rowElement, columnElement), horizontalBoxes);
}

export const renderGrid = (context) => {
    R.times((columnElement) => renderRow(context, columnElement), verticalBoxes)
}
