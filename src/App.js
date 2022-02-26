import React, { useState } from "react";
import CanvasDisplay from "./components/canvasDisplay/CanvasDisplay";
import HelpMenu from "./components/HelpMenu";
import PaintToolsBar from "./components/PaintToolsBar";
import { Grid } from "@mui/material";

const App = () => {
  const [help, setHelp] = useState(false);
  let helpTimeout;

  document.addEventListener("keydown", ({ keyCode }) => {
    clearTimeout(helpTimeout);
    console.log(keyCode);
    setHelp(keyCode === 112);
    helpTimeout = setTimeout(() => {
      setHelp(false);
    }, 500);
  });

  return (
    <div className="App">
      {help ? <HelpMenu /> : ""}
      <Grid container>
        <Grid item xs={2}>
          <PaintToolsBar />
        </Grid>
        <Grid item xs={8}>
          <CanvasDisplay />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
