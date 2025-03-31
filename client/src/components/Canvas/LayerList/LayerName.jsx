import React from "react";

const LayerName = ({
  name,
  handleChangeL,
  readOnly,
  setReadOnly,
  handleChangeName,
  setEditingL,
}) => {
  return (
    <>
      <input
        id={!readOnly ? "edit-name" : ""}
        className="layers-list-name"
        type="text"
        onClick={handleChangeL}
        onChange={handleChangeName}
        onBlur={() => setReadOnly(true) || setEditingL(false)}
        defaultValue={name}
        readOnly={readOnly}
        onKeyPress={(e) => (e.key === "Enter" ? setReadOnly(true) : "")}
      />
    </>
  );
};

export default LayerName;
