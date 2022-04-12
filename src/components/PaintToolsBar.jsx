import {
  Button,
  Slider
} from "@mui/material";
import React from "react";
import ColorPicker from "./ColorPicker";
import LayersContainer from './LayerList';
import ToolsContainer from "./ToolsList";

const PaintToolsBar = ({
  curCanvas,
  color,
  setColor,
  layers,
  setLayers,
  activeL,
  setActiveL,
  size,
  setSize,
  activeTool,
  setActiveTool
}) => {

  return (
    <>
      <ColorPicker
        id="color-picker"
        color={color}
        setColor={setColor}
        curCanvas={curCanvas}
      />
      <ToolsContainer activeTool={activeTool} setActiveTool={setActiveTool}/>
      <Slider value={size} onChange={(event, value) => setSize(value)} min={1} max={100}/>
      <Button
        variant="contained"
        onClick={() => curCanvas.current.changeBg(color)}
        sx={{ width: 1 }}
      >
        Change bg color
      </Button>
      <Button
        variant="contained"
        onClick={() => curCanvas.current.removeLayer(activeL)}
        sx={{ width: 1 }}
      >
        remove current
      </Button>
      <Button
        variant="contained"
        onClick={() => curCanvas.current.removeLayer()}
        sx={{ width: 1 }}
      >
        remove last
      </Button>
      <Button
        variant="contained"
        onClick={() => curCanvas.current.createLayer()}
        sx={{ width: 1 }}
      >
        add layer
      </Button>
      <Button
        variant="contained"
        onClick={() => console.log(activeL)}
        sx={{ width: 1 }}
      >
        get active l
      </Button>
      <LayersContainer layers={layers} setLayers={setLayers} activeL={activeL} setActiveL={setActiveL}/>
    </>
  );
};

export default PaintToolsBar;
