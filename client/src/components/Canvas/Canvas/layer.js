export default class Layer {
  id;
  p5;
  name;
  visible;

  constructor({ p5, width, height, name, id }) {
    this.p5 = p5.createGraphics(width, height);
    this.name = name ?? `Default#${id}`;
    this.id = id;
    this.visible = true;
  }

  setName(name) {
    this.name = name
  } 
}
