import Canvas from "./canvas.js";
import Tools from "./tools.js";
const socket = io("http://127.0.0.1:3000");
window.socket = socket;

let curCanvas = new Canvas();
Tools.canvas = curCanvas;

const p5tools = (p5) => {
  window.p5 = p5;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(curCanvas.bgColor);

    for (const [key, value] of Object.entries(Tools.all)) {
      socket.on(`tool-${key}`, value.func);
    }
  };

  p5.draw = () => {
    const data = {
      x: p5.mouseX,
      y: p5.mouseY,
      pX: p5.pmouseX,
      pY: p5.pmouseY,
      size: Tools.brushSize,
    };

    if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
      Tools.current.func(data);
      socket.emit(`tool-${Tools.current.name}`, data);
    }
    socket.on("canvas-changeBg", curCanvas.changeBgColor);
  };

  p5.mouseWheel = () => {
    const change = Math.floor(-event.delta * 0.01);
    Tools.brushSize += Tools.brushSize <= 1 && change < 0 ? 0 : change;
  };

  p5.keyPressed = () => {
    if (p5.keyCode === 69) {
      // E - eraser
      Tools.current = Tools.all.eraser;
      return;
    } else if (p5.keyCode === 80) {
      // P - pencil
      Tools.current = Tools.all.pencil;
      return;
    } else if (p5.keyCode === 66) {
      // B - bucket
      Tools.current = Tools.all.bucket;
      return;
    }

    // Cycling through options with arrows
    if (p5.keyCode === p5.LEFT_ARROW) {
      Tools.current.id += Tools.current.id > 0 ? -1 : 0;
    } else if (p5.keyCode === p5.RIGHT_ARROW) {
      Tools.current.id += Tools.current.id < Tools.allArr.length - 1 ? 1 : 0;
    }
    Tools.current = Tools.allArr[Tools.current.id];
    console.log(Tools.current.id);
  };
};
new p5(p5tools);

//                Debug purposes
/*
const thisModule = { Tools };
window.myModule = thisModule;
*/
window.Tools = Tools;
window.curCanvas = curCanvas;
window.Canvas = Canvas;
