import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import ColorPicker from "./ColorPicker";

const PaintToolsBar = ({ curCanvas }) => {
  const [color, setColor] = useState("#F0F0F0");


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

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={1}
          name="radio-buttons-group"
        >
          {curCanvas.current.getLayers().map((layer, index) => {
            return (
              <FormControlLabel
                value={index}
                control={<Radio />}
                // label={layer.name}
                label="bruh"
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default PaintToolsBar;
