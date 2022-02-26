import React, { useState } from "react";
import CanvasDisplay from "./components/canvasDisplay/CanvasDisplay";
import HelpMenu from "./components/HelpMenu";
import PaintToolsBar from "./components/PaintToolsBar";
import { Grid, Modal } from "@mui/material";
import useKeypress from "react-use-keypress";

const App = () => {
  const [openHelp, setOpenHelp] = useState(false);
  const handleCloseHelp = () => setOpenHelp(false);

  useKeypress("F1", () => setOpenHelp(!openHelp));
  useKeypress("Escape", () => setOpenHelp(false));

  return (
    <div className="App">
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
          <PaintToolsBar />
        </Grid>
        <Grid item xs={10}>
          <CanvasDisplay />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
