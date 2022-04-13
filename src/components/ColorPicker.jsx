import React from "react";
import { ChromePicker as ColPicker } from "react-color";

const ColorPicker = ({ color, setColor, prevColor, setPrevColor }) => {
  return (
    <ColPicker
      color={color}
      onChange={(color) => setColor(color.rgb)}
      onChangeComplete={(newColor) =>
        setPrevColor([newColor.rgb, prevColor[0]])
      }
    />
  );
};

export default ColorPicker;
