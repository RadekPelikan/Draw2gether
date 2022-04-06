import React, { useRef, useState } from "react";
import HelpMenu from "../../components/HelpMenu";
import PaintToolsBar from "../../components/PaintToolsBar";
import { Container, Grid, Modal, Stack } from "@mui/material";
import useKeypress from "react-use-keypress";
import Canvas from "../../components/Canvas";

const CanvasPage = () => {
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
            <PaintToolsBar curCanvas={curCanvas} />
          </Grid>
          <Grid item xs className="canvas-display center">
            <Canvas width={700} height={600} ref={curCanvas} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CanvasPage;
