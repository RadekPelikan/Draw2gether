import React, { forwardRef, useState, useImperativeHandle } from "react";
import Sketch from "react-p5";
import Tool from "./tool";

const Canvas = forwardRef(({ width, height }, ref) => {
  width = width || 100;
  height = height || 100;

  const [background, setBackground] = useState(240);
  const [p5, setP5] = useState("");

  useImperativeHandle(ref, () => ({
    changeBg(color) {
      setBackground(color);
      p5.background(color);
    },
  }));

  const setup = (p5, canvasParentRef) => {
    setP5(p5);
    p5.createCanvas(width, height).parent(canvasParentRef);
    p5.background(background);
  };

  const draw = () => {
    p5.strokeWeight(4);
    if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
      const data = {
        p5,
        x: p5.mouseX,
        y: p5.mouseY,
        pX: p5.pmouseX,
        pY: p5.pmouseY,
        size: Tool.brushSize,
      };

      Tool.pencil(data);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
});

export default Canvas;
