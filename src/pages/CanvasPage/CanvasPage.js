import React, { useRef, useState } from "react";
import CanvasDisplay from "../../components/CanvasDisplay";
import HelpMenu from "../../components/HelpMenu";
import PaintToolsBar from "../../components/PaintToolsBar";
import { getContrastRatio, Grid, Modal } from "@mui/material";
import useKeypress from "react-use-keypress";

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

      <Grid container>
        <Grid item xs={2}>
          <PaintToolsBar curCanvas={curCanvas}/>
        </Grid>
        <Grid item xs={10}>
          <CanvasDisplay 
          
          ref={curCanvas}/>
        </Grid>
      </Grid>
    </>
  );
};

export default CanvasPage;
