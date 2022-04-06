import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { forwardRef, useState, useImperativeHandle } from "react";
import ColorPicker from "./ColorPicker";

const PaintToolsBar = forwardRef(({ curCanvas, layers, setLayers, activeL, setActiveL }, ref) => {
  const [color, setColor] = useState("#F0F0F0");

  useImperativeHandle(ref, () => ({
    setLayers(layers) {
      setLayers(layers)
    },
  }));

  const handleRadioChange = (event) => {
    setActiveL(event.target.value);
  };

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
        onClick={() => console.log(curCanvas.current.getLayers())}
        sx={{ width: 1 }}
      >
        get Layers
      </Button>
      <Button
        variant="contained"
        onClick={() => console.log(activeL)}
        sx={{ width: 1 }}
      >
        get activeL
      </Button>

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={activeL}
          name="radio-buttons-group"
          onChange={handleRadioChange}
        >
          {layers.map((layer, index) => {
            return (
              <FormControlLabel key={index}
                value={index}
                control={<Radio />} 
                label={layer.name}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </>
  );
});

export default PaintToolsBar;
