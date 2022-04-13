import React, { useRef, useState } from "react";
import HelpMenu from "../../components/HelpMenu";
import PaintToolsBar from "../../components/PaintToolsBar";
import { Container, Modal, Stack } from "@mui/material";
import useKeypress from "react-use-keypress";
import Canvas from "../../components/Canvas";

const CanvasPage = () => {
  const [color, setColor] = useState("#F0F0F0");
  const [prevColor, setPrevColor] = useState([color, color]);
  const [size, setSize] = useState(5);
  const [activeTool, setActiveTool] = useState("pencil");
  const [layers, setLayers] = useState([]);
  const [activeL, setActiveL] = useState(0);

  const [hover, setHover] = useState(false);

  const [openHelp, setOpenHelp] = useState(false);

  const curCanvas = useRef(null);

  useKeypress("p", () => setActiveTool("pencil"));
  useKeypress("e", () => setActiveTool("eraser"));
  useKeypress("b", () => setActiveTool("bucket"));

  useKeypress("n", () => {
    curCanvas.current.createLayer() 
    setActiveL(0)
  });
  useKeypress("r", () => curCanvas.current.removeLayer());

  useKeypress("c", () => {
    curCanvas.current.changeBg(color)
    setColor(prevColor[1])
  });

  useKeypress("+", () => size < 100 && setSize(size + 5));
  useKeypress("-", () => size > 5 && setSize(size - 5));

  const handleCloseHelp = () => setOpenHelp(false);
  useKeypress("F1", () => setOpenHelp(!openHelp));
  useKeypress("Escape", () => setOpenHelp(false));

  return (
    <>
      <Modal
        open={openHelp}
        onClose={handleCloseHelp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <HelpMenu />
      </Modal>

      <Container>
        <Stack direction="row" style={{ height: "100vh" }} spacing={2}>
          <div className="paint-toolbar">
            <PaintToolsBar
              curCanvas={curCanvas}
              color={color}
              setColor={setColor}
              layers={layers}
              setLayers={setLayers}
              activeL={activeL}
              setActiveL={setActiveL}
              size={size}
              setSize={setSize}
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              prevColor={prevColor}
              setPrevColor={setPrevColor}
            />
          </div>

          <div
            className="canvas-wrapper"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Canvas
              width={1500}
              height={1200}
              color={color}
              layers={layers}
              setLayers={setLayers}
              activeL={activeL}
              setActiveL={setActiveL}
              size={size}
              activeTool={activeTool}
              hover={hover}
              ref={curCanvas}
            />
          </div>
        </Stack>
      </Container>
    </>
  );
};

export default CanvasPage;
