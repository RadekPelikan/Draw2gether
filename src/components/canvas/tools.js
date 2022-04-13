const drawLine = ({ p5, x, y, pX, pY, size }) => {
  p5.strokeWeight(size);
  p5.line(x, y, pX, pY);
};

export const ToolsIcons = {
  pencil: "fa-paintbrush",
  eraser: "fa-eraser",
  bucket: "fa-fill-drip",
  line: "fa-grip-lines",
  rectangle: "fa-square",
  circle: "fa-circle"
};

const Tools = {
  pencil(data) {
    const { p5, color } = data;
    p5.noErase();
    p5.stroke(color);
    drawLine(data);
  },

  eraser(data) {
    const { p5 } = data;
    p5.erase();
    drawLine(data);
  },

  bucket(data) {

  }
};

export default Tools;
