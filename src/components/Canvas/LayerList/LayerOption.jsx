import { Checkbox, Input, TextField } from "@mui/material";
import React, { useState } from "react";
import LayerName from "./LayerName";

const LayerOption = ({
  preview,
  opacity,
  handlerId,
  dragIcon,
  name,
  card,
  activeL,
  setActiveL,
  index,
  curCanvas,
  editingL,
  setEditingL,
}) => {
  const [readOnly, setReadOnly] = useState(true);

  const handleChangeL = (e) => {
    setActiveL(index);
    if (e.detail === 2) setReadOnly(false) || setEditingL(true);
  };

  const handleChangeName = (e) => {
    if (e.target.value.length >= 18)
      return (e.target.value = e.target.value.slice(0, -1));
    card.setName(e.target.value);
  };

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
      <LayerName
        name={name}
        handleChangeL={handleChangeL}
        readOnly={readOnly}
        setReadOnly={setReadOnly}
        handleChangeName={handleChangeName}
        setEditingL={setEditingL}
      />
      <div className="layer-interact">
        <Checkbox
          {...label}
          defaultChecked
          onChange={handleVisible}
          style={{ padding: "0px" }}
          size="small"
          className="visible"
        />
        <i className="fa-solid fa-trash-can trash" onClick={handleDelete}></i>
      </div>
    </div>
  );
};

export default LayerOption;
