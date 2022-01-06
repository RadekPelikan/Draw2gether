import Layer from "./layer.js";
import { curCanvas, socket } from "./main.js";

export default class Canvas {
  static idCounter = 0; // TODO: Make counting on server (per room)
  name;
  layers = [];
  bgColor = 240;

  constructor(name) {
    this.name = name ? name : `canvas-${Canvas.idCounter}`;
    this.newLayer();
    Canvas.idCounter++;
  }

  newLayer(name) {
    name = this.layers.push({
      id: Canvas.idCounter,
      layer: new Layer(name),
    });
  }

  #changeBgColor() {
    console.log(this.bgColor);
    p5.background(this.bgColor);
  }

  changeBgColorFromServer(data) {
    curCanvas.bgColor = data.color;
    curCanvas.#changeBgColor();
  }

  changeBgColorFromClient(color) {
    this.bgColor = color;
    socket.emit("canvas-changeBg", { color: this.bgColor });
    this.#changeBgColor();
  }
}
