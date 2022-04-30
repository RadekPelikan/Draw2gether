import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useContext,
  useEffect,
} from "react";
import Sketch from "react-p5";
import Tools from "./tools";
import Layer from "./layer";
import ScrollContainer from "react-indiana-drag-scroll";
import { SocketContext } from "../../../Context/socket";

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
      room,
      user,
    },
    ref
  ) => {
    width = width || 100;
    height = height || 100;

    const [background, setBackground] = useState(240);
    const [drawPreview, setDrawPreview] = useState(true);
    const [startingMouse, setStartingMouse] = useState(null);
    const [prevLayers, setPrevLayers] = useState(layers);
    const [p5, setP5] = useState(null);
    const socket = useContext(SocketContext);

    useImperativeHandle(ref, () => ({
      changeBg(color) {
        color = [color.r, color.g, color.b];
        socket.emit("room:canvas:color", { room, user, color });
        setBackground(color)
      },
      createLayer() {
        socket.emit("room:canvas:layer-create", { room, user });
      },
      removeLayer(index) {
        const id = layers[index].id;
        socket.emit("room:canvas:layer-delete", { room, user, id });
      },
      getLayers() {
        return layers;
      },
      getActiveL() {
        return activeL;
      },
    }));

    const createLayer = (id) => {
      const newLayer = new Layer({ p5, width, height, id });
      newLayer.p5.clear();
      setLayers((prev) => {
        const layerN = prev.filter((item) => item.id === newLayer.id)[0];
        if (layerN !== undefined) return prev;
        return [newLayer, ...prev];
      });
      layers.length && setActiveL(++activeL);
    };

    const deletelLayer = (id) => {
      let index = layers.findIndex((item) => item.id === id);
      if (layers.length === 0) return;
      index = index ?? layers.length - 1;
      if ((activeL == index || activeL == layers.length - 1) && activeL != 0)
        setActiveL(--activeL);
      const layer = layers[index].p5;
      layer.remove();
      const newLayers = layers.slice();
      newLayers.splice(index, 1);
      setLayers(newLayers);
    };

    const setup = (p5, canvasParentRef) => {
      setP5(p5);
      p5.createCanvas(width, height).parent(canvasParentRef);
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

    const drawTool = (data) => {
      Tools[data.activeTool](data);
    };

    const draw = (p5) => {
      p5.background(background);
      let layersTR = layers; // Additional layers, that won't be in the list of layers

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
      };

      if (layers.length === 0) return;

      const layer = layersTR[activeL]?.p5;
      if (layer === undefined) return;
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
          activeTool,
          activeL,
          canvSize: {width, height}
        };
        if (["pencil", "eraser"].includes(activeTool)) drawTool(data);
        delete data.p5;
        socket.emit("room:canvas:tool", { room, user, tool: data });
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

    useEffect(() => {
      socket.off("room:canvas:tool:done");
      socket.off("room:canvas:layer-create:done");
      socket.off("room:canvas:layer-get:done");
      socket.off("room:canvas:layer-delete:done");
      socket.off("room:canvas:layer-move:done");
      socket.off("room:canvas:color:done");
      socket.on("room:canvas:tool:done", ({ room, user, tool }) => {
        tool.p5 = layers[tool.activeL].p5;
        drawTool(tool);
      });
      socket.on("room:canvas:layer-create:done", ({ id }) => {
        createLayer(id);
      });
      socket.on("room:canvas:layer-delete:done", ({ id }) => {
        deletelLayer(id);
      });
      socket.on("room:get:done");
      socket.on("room:canvas:layer-get:done", ({ layers }) => {
        layers.forEach((layer) => {
          createLayer(layer.id);
        });
      });
      socket.on("room:canvas:layer-move:done", ({ indexes }) => {
        const layersN = layers;
        const c = layersN[indexes[0]];
        layersN[indexes[0]] = layersN[indexes[1]];
        layersN[indexes[1]] = c;
        setLayers(layersN);
      });
      socket.on("room:canvas:color:done", ({color}) => {
        setBackground(color)
      });
    }, [layers, activeL, p5]);

    useEffect(() => {
      socket.emit("room:canvas:layer-get", { room, user });
      socket.emit("room:canvas:color", { room, user });
    }, []);

    useEffect(() => {
      if (layers.length !== prevLayers.length) return setPrevLayers(layers);
      const idsL = layers.map((layer) => ({ id: layer.id }));
      const idsP = prevLayers.map((layer) => ({ id: layer.id }));
      const indexes = idsL
        .map((item, index) => (item.id === idsP[index].id ? "" : index))
        .filter((item) => item !== "");
      socket.emit("room:canvas:layer-move", { room, user, indexes });
      setPrevLayers(layers);
    }, [layers]);

    return (
      <>
        <ScrollContainer className="scroll-container" buttons={[1]}>
          <Sketch setup={setup} draw={draw} mouseReleased={mouseReleased} />
        </ScrollContainer>
      </>
    );
  }
);

export default Canvas;
