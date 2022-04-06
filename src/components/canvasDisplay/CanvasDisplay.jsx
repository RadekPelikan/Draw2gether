import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import Canvas from "../Canvas";

const CanvasDisplay = forwardRef(({}, ref) => {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);

  useImperativeHandle(ref, () => ({
    handleChangeBg(color) {
      color = [color.r, color.g, color.b];
      canvasRef.current.changeBg(color);
    },
    getCanvasRef() {
      return canvasRef;
    }
  }));

  return (
    <>
        <ScrollContainer className="scroll-container center" buttons={[1]}>
          <Canvas width={700} height={8000} ref={canvasRef} />
        </ScrollContainer>
    </>
  );
});

export default CanvasDisplay;
