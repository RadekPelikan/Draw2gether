export default class Tool {
  static brushSize = 5;

  static drawLine({p5, x, y, pX, pY, size}) {
    p5.strokeWeight(size);
    p5.line(x, y, pX, pY);
  }

  static pencil(data) {
    const {p5} = data;
    p5.stroke(0);
    Tool.drawLine(data);
  }

}
