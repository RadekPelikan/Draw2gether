import React, { useRef, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import Canvas from "../canvas/Canvas";

const CanvasDisplay = () => {
  const canvasRef = useRef(null);
  const [bgColor, setBgColor] = useState("#F0F0F0");

  const changeColor = (e) => {
    setBgColor(e.target.value);
    canvasRef.current.changeBg(bgColor);
  };

  return (
    <>
      <input
        type="color"
        id="head"
        name="head"
        value={bgColor}
        onChange={(e) => changeColor(e)}
      />

        <ScrollContainer className="container" buttons={[1]}>
          <Canvas width={700} height={300} ref={canvasRef}></Canvas>
        </ScrollContainer>
    </>
  );
};

export default CanvasDisplay;
