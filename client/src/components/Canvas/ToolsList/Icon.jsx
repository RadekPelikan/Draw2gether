import React from "react";

const Icon = ({ icon, activeTool, setActiveTool }) => {
  
  const handleClick = (event) => {
    setActiveTool(event.target.dataset.tool)
  }

  return <i className={`${icon[1]} fa-solid fa-lg icons-list-icon ${icon[0] === activeTool ?  "icons-list-selected" : ""}`} onClick={handleClick} data-tool={icon[0]}></i>
};

export default Icon;
