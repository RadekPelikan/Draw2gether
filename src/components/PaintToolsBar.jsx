import {
  Button,
} from "@mui/material";
import React from "react";
import ColorPicker from "./ColorPicker";
import LayersContainer from './LayerList/LayersContainer';

const PaintToolsBar = ({
  curCanvas,
  color,
  setColor,
  layers,
  setLayers,
  activeL,
  setActiveL,
}) => {

  return (
    <>
      <ColorPicker
        id="color-picker"
        color={color}
        setColor={setColor}
        curCanvas={curCanvas}
      />
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
      <LayersContainer layers={layers} setLayers={setLayers} activeL={activeL} setActiveL={setActiveL}/>
    </>
  );
};

export default PaintToolsBar;
