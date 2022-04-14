import { Grid, Stack } from "@mui/material";
import React from "react";
import { ToolsIcons } from "../Canvas/tools";
import Icon from "./Icon";

const ToolsContainer = ({ activeTool, setActiveTool }) => {
  return (
    <Grid container spacing={2}>
      {Object.entries(ToolsIcons).map((element, index) => (
        <Grid item xs={3} key={index}>
          <Icon
            icon={element}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ToolsContainer;
