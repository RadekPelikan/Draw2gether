import { Grid, Stack } from "@mui/material";
import React from "react";
import { ToolsIcons } from "../Canvas/tools";
import Icon from "./Icon";

const ToolsContainer = ({ activeTool, setActiveTool }) => {
  return (
    <>
      <div className="tools-container">
        {Object.entries(ToolsIcons).map((element, index) => (
          <Icon
            icon={element}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
          />
        ))}
      </div>
    </>
  );
};

export default ToolsContainer;
