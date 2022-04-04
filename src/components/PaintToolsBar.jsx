import React, { useState } from "react";
import ColorPicker from './ColorPicker'

const PaintToolsBar = ({curCanvas}) => {
  const [color, setColor] = useState("#F0F0F0");
  return (
    <>
      <div>PaintTools</div>
      <ColorPicker
        color={color}
        setColor={setColor}
        curCanvas={curCanvas}
      />
    </>
  );
};

export default PaintToolsBar;
