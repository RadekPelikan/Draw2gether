import { Stack } from "@mui/material";
import React from "react";
import { ToolsIcons } from "../Canvas/tools";
import Icon from "./Icon";

const ToolsContainer = ({activeTool, setActiveTool}) => {
  return (
    <Stack className="icons-container" direction="row" justifyContent="space-between" spacing={2}>
      {Object.entries(ToolsIcons).map((element, index) => (
        <Icon icon={element} key={index} activeTool={activeTool} setActiveTool={setActiveTool} />
      ))}
    </Stack>
  );
};

export default ToolsContainer;
