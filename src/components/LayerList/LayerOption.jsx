import { Checkbox } from "@mui/material";
import React from "react";

const LayerOption = ({
  preview,
  opacity,
  handlerId,
  dragIcon,
  name,
  activeL,
  setActiveL,
  index,
  curCanvas,
}) => {
  const handleDelete = () => {
    curCanvas.current.removeLayer(index);
  };

  const handleVisible = () => {
    const layers = curCanvas.current.getLayers();
    layers[index].visible = !layers[index].visible;
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div
      ref={preview}
      style={{ opacity }}
      className={`layers-list-card ${
        index === activeL ? "layers-list-selected" : ""
      }`}
      data-handler-id={handlerId}
    >
      <i className="fa-solid fa-lg fa-bars drag" ref={dragIcon}></i>
      <p className="layers-list-name" onClick={() => setActiveL(index)}>
        {name}
      </p>
      <div class="layer-interact">
        <Checkbox
          {...label}
          defaultChecked
          onChange={handleVisible}
          style={{padding: '0px'}}
          size="small"
          className="visible"
        />
        <i className="fa-solid fa-trash-can trash" onClick={handleDelete}></i>
      </div>
    </div>
  );
};

export default LayerOption;
