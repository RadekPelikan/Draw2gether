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
      hover,
    },
    ref
  ) => {
    width = width || 100;
    height = height || 100;

    const [background, setBackground] = useState(240);
    const [drawPreview, setDrawPreview] = useState(true);
    const [startingMouse, setStartingMouse] = useState(null);
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
    };

    const renderCursor = (p5) => {
      const strokeWeight = Math.sqrt(size);
      const edgeStroke = size + strokeWeight / 2;
      const alpha = 150;
      p5.strokeCap(p5.SQUARE);
      p5.noFill();
      p5.stroke(0, alpha);
      p5.strokeWeight(strokeWeight);
      p5.arc(p5.mouseX, p5.mouseY, edgeStroke, edgeStroke, 0, p5.PI);
      p5.stroke(255, alpha);
      p5.arc(p5.mouseX, p5.mouseY, edgeStroke, edgeStroke, p5.PI, p5.TWO_PI);
    };

    const draw = (p5) => {
      p5.background(background);
      let layersTR = layers; // Additional layers, that won't be in the list of layers

      const drawTool = (data) => {
        Tools[activeTool](data);
      };

      const drawGeometric = (data) => {
        layersTR = [
          ...layersTR.slice(0, activeL),
          p5.createGraphics(width, height),
          ...layersTR.slice(activeL),
        ];
        data.p5 = layersTR[activeL];
        // Tools[activeTool](data);
        // switch (activeTool) {
        //   case "line":
        //     break;
        //   case "rectangle":
        //     break;
        //   case "circle":
        //     break;
        // }
        if (drawPreview) return;
        console.log("done preview");
      };

      if (layers.length === 0) return;

      const layer = layersTR[activeL].p5;
      if (
        p5.mouseIsPressed &&
        p5.mouseButton === p5.LEFT &&
        hover &&
        layersTR[activeL].visible
      ) {
        const data = {
          p5: layer,
          color:
            color instanceof String
              ? color
              : [color.r, color.g, color.b, color.a * 255],
          size,
          x: p5.mouseX,
          y: p5.mouseY,
          pX: p5.pmouseX,
          pY: p5.pmouseY,
        };
        if (["pencil", "eraser"].includes(activeTool)) drawTool(data);
        // if (["line", "rectangle", "circle"].includes(activeTool))
        //   drawGeometric(data);
      }
      layersTR
        .slice(0)
        .reverse()
        .forEach((layer) => layer.visible && p5.image(layer.p5, 0, 0));
      renderCursor(p5);
    };

    const mouseReleased = (p5) => {
      setDrawPreview(true);
    };

    return (
      <ScrollContainer className="scroll-container" buttons={[1]}>
        <Sketch setup={setup} draw={draw} mouseReleased={mouseReleased} />
      </ScrollContainer>
    );
  }
);

export default Canvas;
