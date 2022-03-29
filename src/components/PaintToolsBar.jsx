import React from "react";
import ColorPicker from './ColorPicker'

const PaintToolsBar = () => {
  return (
    <>
      <div>PaintTools</div>
      <ColorPicker
        color={color}
        setColor={setColor}
        handleChangeBg={handleChangeBg}
      />
    </>
  );
};

export default PaintToolsBar;
