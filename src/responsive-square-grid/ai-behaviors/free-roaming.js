import { screenSettings, gridSettings } from "../../settings/settings";
import { selection } from "../state"

export const aiMove = () => {
    const columnMove = Math.floor(Math.random() * 3);
    const rowMove = Math.floor(Math.random() * 3);
    if (columnMove === 1) {
        const nextStep = selection.aiColumn - 1;
        selection.aiColumn = zeroBorderOverride(nextStep);
    }
    else if (columnMove === 2) {
        const nextStep = selection.aiColumn + 1
        const max = gridSettings.horizontalBoxes - 1;
        selection.aiColumn = maxBorderOverride(nextStep, max);
    }
    if (rowMove === 1) {
        const nextStep = selection.aiRow - 1;
        selection.aiRow = zeroBorderOverride(nextStep);
    }   
    else if (rowMove === 2) {   
        const nextStep = selection.aiRow + 1;
        const max = gridSettings.verticalBoxes - 1;
        selection.aiRow = maxBorderOverride(nextStep, max);
    }
}

const maxBorderOverride = (position, max) => {
    if (position > max) {
        return position - 1;
    }
    return position;
}

const zeroBorderOverride = (position) => {
    if (position < 0) {
        return position + 1;
    }
    return position;
}
