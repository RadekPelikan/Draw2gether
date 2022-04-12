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
      <i className="fa-solid fa-trash-can trash" onClick={handleDelete}></i>
    </div>
  );
};

export default LayerOption;
