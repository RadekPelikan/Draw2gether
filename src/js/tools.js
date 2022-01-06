export default class Tools {
  static all = {
    pencil: { id: 0, name: "pencil", func: this.pencil },
    eraser: { id: 1, name: "eraser", func: this.eraser },
    bucket: { id: 2, name: "bucket", func: this.bucket },
  };
  // static allArr = [this.all.pencil, this.all.eraser, this.all.bucket];
  static allArr = [this.all.pencil, this.all.eraser]; // Bucket does nothing now
  static current = this.all.pencil;
  static brushSize = 5;
  static canvas;

  static drawLine(data) {
    const { x, y, pX, pY, size } = data;
    p5.strokeWeight(size);
    p5.line(x, y, pX, pY);
  }

  static pencil(data) {
    p5.stroke(0);
    Tools.drawLine(data);
  }

  static eraser(data) {
    p5.stroke(Tools.canvas.bgColor);
    Tools.drawLine(data);
    p5.stroke(0);
  }

  static bucket(data) {
    // some shit to make bucket fill alhorith work
  }
}
