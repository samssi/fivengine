import * as R from "ramda";
import { screenSettings } from "../settings/settings";
import { selection } from "./state"

const verticalBoxes = 5;
const horizontalBoxes = 5;
const defaultElementWidth = Math.round(screenSettings.screenWidth / horizontalBoxes);
const defaultElementHeight = Math.round(screenSettings.screenHeight / verticalBoxes);

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
    R.times((rowElement) => renderElement(context, rowElement, columnElement), horizontalBoxes);
}

export const aiMove = () => {
    const columnMove = Math.floor(Math.random() * 3);
    const rowMove = Math.floor(Math.random() * 3);
    if (columnMove === 1) {
        const nextStep = selection.aiColumn - 1;
        selection.aiColumn = zeroBorderOverride(nextStep);
    } 
    else if (selection.aiColumn < horizontalBoxes - 1) {
        selection.aiColumn = selection.aiColumn + 1;
    }
    if (rowMove === 1) {
        const nextStep = selection.aiRow - 1;
        selection.aiRow = zeroBorderOverride(nextStep);
    }
    else if (selection.aiRow < verticalBoxes - 1) {
        selection.aiRow = selection.aiRow + 1;
    }
}

const zeroBorderOverride = (position) => {
    if (position < 0) {
        return position + 1;
    }
    else {
        return position;
    }
}

export const mouseSelect = (mouseX, mouseY) => {
    selection.mouseRow = Math.floor(mouseX / defaultElementWidth);
    selection.mouseColumn = Math.floor(mouseY / defaultElementHeight);
}

export const renderGrid = (canvas) => {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    R.times((columnElement) => renderRow(context, columnElement), verticalBoxes);
}
