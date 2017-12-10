import * as R from "ramda";
import { screenSettings, gridSettings } from "../settings/settings";
import { selection } from "./state"

const defaultElementWidth = Math.round(screenSettings.screenWidth / gridSettings.horizontalBoxes);
const defaultElementHeight = Math.round(screenSettings.screenHeight / gridSettings.verticalBoxes);

const mouseSelected = (rowElement, columnElement) => selection.mouseRow === rowElement && selection.mouseColumn === columnElement;
const aiSelected = (rowElement, columnElement) => selection.aiRow === rowElement && selection.aiColumn === columnElement;

const renderElement = (context, rowElement, columnElement) => {
    const left = defaultElementWidth * rowElement;
    const top = defaultElementHeight * columnElement;
    context.strokeStyle = "blue";
    const color = colorPicker(context, rowElement, columnElement);
    if (color) {
        context.fillStyle = color; 
        context.fillRect(left, top, defaultElementWidth, defaultElementHeight);
    }
    context.stroke();
}

const colorPicker = (context, rowElement, columnElement) => {
    if (mouseSelected(rowElement, columnElement)) {
        return "blue"; 
    }
    else if(aiSelected(rowElement, columnElement)) {
         return "red";
    }
    else {
        return undefined;
    }
}

const renderRow = (context, columnElement) => {
    R.times((rowElement) => renderElement(context, rowElement, columnElement), gridSettings.horizontalBoxes);
}

export const mouseSelect = (mouseX, mouseY) => {
    selection.mouseRow = Math.floor(mouseX / defaultElementWidth);
    selection.mouseColumn = Math.floor(mouseY / defaultElementHeight);
}

export const renderGrid = (canvas) => {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    R.times((columnElement) => renderRow(context, columnElement), gridSettings.verticalBoxes);
}
