import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Canvas from "../Canvas";

const CanvasDisplay = forwardRef(({color}, ref) => {
  const arr = new Array(1).fill();
  const canvasRefs = useRef([]);
  const [active, setActive] = useState(0);

  useImperativeHandle(ref, () => ({
    handleChangeBg(color) {
      color = [color.r, color.g, color.b]
      console.log(canvasRefs.current[active]);
      canvasRefs.current[active].changeBg(color);
    },
  }));

  const handleChangeCanvas = (event) => {
    setActive(event.target.dataset.id);
  };

  const buttonStyle = {
    margin: "1rem",
    fontSize: "2em",
  };

  return (
    <>
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
    </>
  );
});

export default CanvasDisplay;
