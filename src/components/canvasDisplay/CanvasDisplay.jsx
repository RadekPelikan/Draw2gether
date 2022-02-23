import React, { useRef, useState } from "react";
import Canvas from "../canvas/Canvas";

const CanvasDisplay = () => {
  const arr = new Array(4).fill();
  const canvasRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [color, setColor] = useState("#F0F0F0");

  const handleChangeBg = () => {
    console.log(canvasRefs.current[active]);
    canvasRefs.current[active].changeBg(color);
  };

  const handleChangeCanvas = (event) => {
    setActive(event.target.dataset.id);
  };

  const buttonStyle = {
    margin: "1rem",
    fontSize: "2em",
  };

  return (
    <>
      <input
        type="color"
        id="head"
        name="head"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      {arr.map((item, i) => {
        return (
          <div className="canvas-wrapper" key={i}>
            <button
              onClick={handleChangeCanvas}
              style={buttonStyle}
              data-id={i}
            >
              Canvas{i}
            </button>
            <Canvas
              width={700}
              height={300}
              ref={(element) => {
                canvasRefs.current[i] = element;
              }}
            />
          </div>
        );
      })}

      <button onClick={handleChangeBg} style={buttonStyle}>
        Change color
      </button>
    </>
  );
};

export default CanvasDisplay;
