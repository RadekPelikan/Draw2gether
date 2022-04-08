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
}) => {
  return (
    <div
      ref={preview}
      style={{ opacity }}
      className={`layers-list-card ${
        index === activeL ? "layers-list-selected" : ""
      }`}
      data-handler-id={handlerId}
      onClick={() => setActiveL(index)}
    >
      <i className="fa-solid fa-lg fa-bars layers-list-icon" ref={dragIcon}></i>
      <p className="layers-list-name">{name}</p>
    </div>
  );
};

export default LayerOption;
