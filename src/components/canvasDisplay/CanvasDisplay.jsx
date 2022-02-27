import React, { useRef, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { createReparentableSpace, Parent } from "react-reparenting";
import Canvas from "../canvas/Canvas";

const CanvasDisplay = () => {
  const canvasRef = useRef();
  const [bgColor, setBgColor] = useState("#F0F0F0");
  const { Reparentable, sendReparentableChild } = createReparentableSpace();

  const [parents, setParents] = useState({
    A: ["c1", "c2"],
    B: ["c3"],
  });

  // The Child components.
  const children = {
    parentA: parents.A.map((key) => (
      <Canvas width={700} height={300} key={key} />
    )),
    parentB: parents.B.map((key) => (
      <Canvas width={700} height={300} key={key} />
    )),
  };

  // Parent instance refs.
  const parentARef = useRef();
  const parentBRef = useRef();

  const parentA = parentARef.current;
  const parentB = parentBRef.current;

  const handleMoveChild = () => {
    console.log("yes");
    // before the Child ('c2') of 'parentA'.
    sendReparentableChild("parentB", "parentA", 0, "c2");
    // Send the Child ('c1') of 'parentA'
    // in the first position of 'parentB'.
    sendReparentableChild("parentA", "parentB", "c1", 0);

    // Re-render the components with the changes.
    // The transferred children won't be re-mounted.
  };

  const changeColor = (e) => {
    setBgColor(e.target.value);
    console.log(parentARef);
    parentARef.current.changeBg(bgColor);
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

      <button onClick={handleMoveChild}>Click me!</button>

      <ScrollContainer className="container" buttons={[1]}>
        <Reparentable id="parentA">{children.parentA}</Reparentable>
      </ScrollContainer>
      <h1>bruh</h1>
      <Reparentable id="parentB">{children.parentB}</Reparentable>
    </>
  );
};

export default CanvasDisplay;
