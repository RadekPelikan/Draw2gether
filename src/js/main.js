let brushSize = 5;
let socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240);

  socket = io("http://127.0.0.1:3000");

  socket.on("tool-pencil", pencil);
  socket.on("tool-eraser", eraser);
  socket.on("tool-bucket", bucket);
}

function draw() {
  if (mouseIsPressed && mouseButton === LEFT) {
    drawLine(mouseX, mouseY, pmouseX, pmouseY, brushSize);
    const data = {
      x: mouseX,
      y: mouseY,
      pX: pmouseX,
      pY: pmouseY,
      size: brushSize,
    };
    socket.emit("tool-pencil", data);
  }
  
}

function mouseWheel(event) {
  const change = Math.floor(-event.delta * 0.01);
  brushSize += brushSize > 1 || change > 0 ? change : 0;
  console.log(brushSize)
}

const bucket = (data) => {
  // some shit to make bucket fill alhorith work
}

const pencil = (data) => {
  const {x, y, pX, pY, size} = data
  drawLine(x, y, pX, pY, size);
}

const eraser = (data) => {
  stroke(255)
  const {x, y, pX, pY, size} = data
  drawLine(x, y, pX, pY, size);
  stroke(0)
}

const drawLine = (x, y, pX, pY, size) => {
  strokeWeight(size);
  line(x, y, pX, pY);
};
