const body = document.body;
const head = document.head;
const rootElement = document.getElementById("root");

const renderCss = () => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "/css/reset.css";
    head.appendChild(link);
}

export const fullScreenCanvas = () => {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return canvas;
}

export const fixedCanvas = (width, height) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

export const renderPage = (canvas) => {
    console.log("Starting 5gine")
    body.style.backgroundColor = "black";
    renderCss();
    rootElement.appendChild(canvas);
}

