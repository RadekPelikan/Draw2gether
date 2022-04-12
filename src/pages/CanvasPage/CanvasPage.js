import React, { useRef, useState } from "react";
import HelpMenu from "../../components/HelpMenu";
import PaintToolsBar from "../../components/PaintToolsBar";
import { Container, Grid, Modal, Stack } from "@mui/material";
import useKeypress from "react-use-keypress";
import Canvas from "../../components/Canvas";

const CanvasPage = () => {
  const [color, setColor] = useState("#F0F0F0");
  const [size, setSize] = useState(5)
  const [activeTool, setActiveTool] = useState("pencil")
  const [layers, setLayers] = useState([]);
  const [activeL, setActiveL] = useState(0);
  const [openHelp, setOpenHelp] = useState(false);
  const handleCloseHelp = () => setOpenHelp(false);

  const curCanvas = useRef(null);

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
        <Grid container>
          <Grid item className="paint-toolbar">
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
            />
          </Grid>
          <Grid item xs className="canvas-display center">
            <Canvas
              width={700}
              height={600}
              color={color}
              layers={layers}
              setLayers={setLayers}
              activeL={activeL}
              setActiveL={setActiveL}
              size={size}
              activeTool={activeTool}
              ref={curCanvas}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CanvasPage;
