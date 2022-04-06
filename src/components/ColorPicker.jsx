import React, { useState } from "react";
import { ChromePicker as ColPicker } from "react-color";

const ColorPicker = ({ color, setColor, curCanvas }) => {

  return (
    <ColPicker
      color={color}
      onChange={(color) => setColor(color.rgb)}
    />
  );
};

export default ColorPicker;
