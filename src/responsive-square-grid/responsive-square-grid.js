import * as R from "ramda";
import { screenSettings } from "../settings/settings";
import { selection } from "./state"

const verticalBoxes = 20;
const horizontalBoxes = 20;
const defaultElementWidth = Math.round(screenSettings.screenWidth / horizontalBoxes);
const defaultElementHeight = Math.round(screenSettings.screenHeight / verticalBoxes);

const mouseSelected = (rowElement, columnElement) => selection.mouseRow === rowElement && selection.mouseColumn === columnElement;
const aiSelected = (rowElement, columnElement) => selection.aiRow === rowElement && selection.aiColumn === columnElement;

const renderElement = (context, rowElement, columnElement) => {
    const left = defaultElementWidth * rowElement;
    const top = defaultElementHeight * columnElement;
    context.lineWidth = "1";
    context.strokeStyle = "blue";
    context.rect(left, top, defaultElementWidth, defaultElementHeight);
    colorPicker(context, rowElement, columnElement);
    context.fillRect(left, top, defaultElementWidth, defaultElementHeight);
    context.stroke();
}

const colorPicker = (context, rowElement, columnElement) => {
    if (mouseSelected(rowElement, columnElement)) {
        context.fillStyle = "blue"; 
    }
    else if(aiSelected(rowElement, columnElement)) {
         context.fillStyle = "red";
    }
    else {
        context.fillStyle = "black";
    }
}

const renderRow = (context, columnElement) => {
    R.times((rowElement) => renderElement(context, rowElement, columnElement), horizontalBoxes);
}

export const aiMove = () => {
    const columnMove = Math.floor(Math.random() * 2);
    const rowMove = Math.floor(Math.random() * 2);
    if (columnMove === 1 && selection.aiColumn > 0) {
        selection.aiColumn = selection.aiColumn - 1;
    } 
    else if (selection.aiColumn < horizontalBoxes - 1) {
        selection.aiColumn = selection.aiColumn + 1;
    }
    if (rowMove === 1 && selection.aiRow > 0) {
        selection.aiRow = selection.aiRow - 1
    }
    else if (selection.aiRow < verticalBoxes - 1) {
        selection.aiRow = selection.aiRow + 1;
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
