import React, { forwardRef, useState, useImperativeHandle } from "react";
import Sketch from "react-p5";
import Tools from "./tools";
import Layer from "./layer";
import ScrollContainer from "react-indiana-drag-scroll";

const Canvas = forwardRef(
  ({ width, height, layers, setLayers, activeL, setActiveL, color }, ref) => {
    width = width || 100;
    height = height || 100;

    const [background, setBackground] = useState(240);
    const [p5, setP5] = useState(null);

    useImperativeHandle(ref, () => ({
      changeBg(color) {
        color = [color.r, color.g, color.b];
        setBackground(color);
      },
      createLayer() {
        createLayer();
      },
      removeLayer(index) {
        if (layers.length === 0) return;
        index = index ?? layers.length - 1;
        if (activeL == index && index != 0) setActiveL(--activeL);
        const layer = layers[index].p5;
        layer.clear();
        layer.remove();
        const newLayers = layers.slice();
        newLayers.splice(index, 1);
        setLayers(newLayers);
      },
      getLayers() {
        return layers;
      },
      getActiveL() {
        return activeL;
      },
    }));

    const createLayer = (p5l) => {
      p5l = p5l || p5;
      const newLayer = new Layer({ p5: p5l, width, height });
      setLayers([...layers, newLayer]);
    };

    const setup = (p5, canvasParentRef) => {
      setP5(p5);
      p5.createCanvas(width, height).parent(canvasParentRef);
      createLayer(p5);
    };

    const draw = () => {
      p5.background(background);
      if (layers.length === 0) return;
      const layer = layers[activeL].p5;
      if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
        const data = {
          p5: layer,
          color: [color.r, color.g, color.b] || color,
          x: p5.mouseX,
          y: p5.mouseY,
          pX: p5.pmouseX,
          pY: p5.pmouseY,
          size: Tools.brushSize,
        };
        Tools.pencil(data);
      }
      layers.forEach((layer) => p5.image(layer.p5, 0, 0));
    };

    return (
      <ScrollContainer className="scroll-container center" buttons={[1]}>
        <Sketch setup={setup} draw={draw} />
      </ScrollContainer>
    );
  }
);

export default Canvas;
