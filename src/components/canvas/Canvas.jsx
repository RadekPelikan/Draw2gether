import React, { forwardRef, useState, useImperativeHandle } from "react";
import Sketch from "react-p5";
import Tools from "./tools";
import Layer from "./layer";
import ScrollContainer from "react-indiana-drag-scroll";

const Canvas = forwardRef(
  (
    {
      width,
      height,
      layers,
      setLayers,
      activeL,
      setActiveL,
      color,
      size,
      activeTool,
    },
    ref
  ) => {
    width = width || 100;
    height = height || 100;

    const [cursorLayer, setCursorLayser] = useState(null);
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
        if ((activeL == index || activeL == layers.length - 1) && activeL != 0)
          setActiveL(--activeL);
        const layer = layers[index].p5;
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
      newLayer.p5.clear();
      setLayers([newLayer, ...layers]);
      layers.length && setActiveL(++activeL);
    };

    const setup = (p5, canvasParentRef) => {
      setP5(p5);
      p5.createCanvas(width, height).parent(canvasParentRef);
      createLayer(p5);
      setCursorLayser(p5.createGraphics(width, height));
    };

    const renderCursor = () => {
      const strokeWeight = Math.sqrt(size)
      const edgeStroke = size + strokeWeight / 2
      cursorLayer.strokeCap(p5.PROJECT);
      cursorLayer.clear()
      cursorLayer.noFill();
      cursorLayer.stroke(0);
      cursorLayer.strokeWeight(strokeWeight);
      cursorLayer.arc(p5.mouseX, p5.mouseY, edgeStroke, edgeStroke, 0, p5.PI);
      cursorLayer.stroke(255);
      cursorLayer.arc(p5.mouseX, p5.mouseY, edgeStroke, edgeStroke, p5.PI, p5.TWO_PI);
    };

    const draw = (p5) => {
      p5.background(background);
      renderCursor();

      if (layers.length === 0) return;

      const layer = layers[activeL].p5;
      if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
        const data = {
          p5: layer,
          color: [color.r, color.g, color.b] || color,
          size,
          x: p5.mouseX,
          y: p5.mouseY,
          pX: p5.pmouseX,
          pY: p5.pmouseY,
        };
        Tools[activeTool](data);
      }
      layers
        .slice(0)
        .reverse()
        .forEach((layer) => p5.image(layer.p5, 0, 0));
      p5.image(cursorLayer, 0, 0);
    };

    return (
      <ScrollContainer className="scroll-container center" buttons={[1]}>
        <Sketch setup={setup} draw={draw} />
      </ScrollContainer>
    );
  }
);

export default Canvas;
