import React, { forwardRef, useState, useImperativeHandle } from "react";
import Sketch from "react-p5";
import Tools from "./tools";
import Layer from "./layer";

const Canvas = forwardRef(({ width, height }, ref) => {
  width = width || 100;
  height = height || 100;

  const [background, setBackground] = useState(240);
  const [p5, setP5] = useState("");
  const [layers, setLayers] = useState([]);
  const [activeL, setActiveL] = useState(0);

  useImperativeHandle(ref, () => ({
    changeBg(color) {
      setBackground(color);
    },
    createLayer() {
      createLayer();
    },
    removeLayer(index) {
      index = index ?? layers.length - 1;
      p5.clear()
      layers[index].clear();
      layers[index].remove();
      layers.splice(index, 1);
    },
    getLayers() {
      return layers;
    },
    getActiveL() {
      return activeL;
    },
    setActiveL(layerN) {
      setActiveL(layerN);
    },
  }));

  const createLayer = () => {
    const newLayer = new Layer({ p5, width, height });
    setLayers([...layers, newLayer]);
  };

  const setup = (p5, canvasParentRef) => {
    setP5(p5);
    p5.createCanvas(width, height).parent(canvasParentRef);
    const newLayer = new Layer({ p5, width, height });
    setLayers([...layers, newLayer]);
  };

  const draw = () => {
    p5.background(background);
    if (layers.length === 0) return
    const layer = layers[activeL];
    if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
      const data = {
        p5: layer,
        x: p5.mouseX,
        y: p5.mouseY,
        pX: p5.pmouseX,
        pY: p5.pmouseY,
        size: Tools.brushSize,
      };
      Tools.pencil(data);
    }
    p5.image(layer, 0, 0);
  };

  return <Sketch setup={setup} draw={draw} />;
});

export default Canvas;
