import { Button } from "@mui/material";
import React, { useState } from "react";
import ColorPicker from "./ColorPicker";

const PaintToolsBar = ({ curCanvas }) => {
  const [color, setColor] = useState("#F0F0F0");
  return (
    <>
      <ColorPicker id="color-picker" color={color} setColor={setColor} curCanvas={curCanvas} />
      <Button
        variant="contained"
        onClick={() => curCanvas.current.handleChangeBg(color)}
        sx={{ width: 1 }}
      >
        Change bg color
      </Button>
      <Button
        variant="contained"
        onClick={() => curCanvas.current.getCanvasRef().current.removeLayer()}
        sx={{ width: 1 }}
      >
        remove last
      </Button>
      <Button
        variant="contained"
        onClick={() => curCanvas.current.getCanvasRef().current.createLayer()}
        sx={{ width: 1 }}
      >
        add layer
      </Button>
      <Button
        variant="contained"
        onClick={() => console.log(curCanvas.current.getCanvasRef().current.getLayers())}
        sx={{ width: 1 }}
      >
        get Layers
      </Button>
    </>
  );
};

export default PaintToolsBar;
