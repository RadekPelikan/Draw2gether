import Layer from "./layer.js";

export default class Canvas {
  static idCounter = 0;
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

  changeBgColor(color) {
    // if (!color || (Array. isArray(color) && color.length > 1 && color.length != 3)) {
    //   return { done: false };
    // }
    p5.background(color);
    // return { done: true };
  }
}
