export default class Layer {
  static idCounter = 0;
  name;
  visibility;
  opacity;

  constructor(name) {
    this.name = name ? name : `layer-${Layer.idCounter}`;
    this.visibility = true;
    this.opacity = 100;
    Layer.idCounter++;
  }
}
