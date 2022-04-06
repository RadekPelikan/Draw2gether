export default class Layer {
  static idcounter = 1;
  id;
  p5;
  name;

  constructor({ p5, width, height, name }) {
    this.p5 = p5.createGraphics(width, height);
    this.name = name ?? `Default#${Layer.idcounter}`;
    this.id = Layer.idcounter++;
    // this.name = "bruh"
    // this.id = 1
  }
}
