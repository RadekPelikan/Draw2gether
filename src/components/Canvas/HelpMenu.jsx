import React from "react";
import { Box, Typography, Stack } from "@mui/material";

const HelpMenu = () => {
  const helpArr = [
    ["This menu", "F1"],
    ["Brush", "P"],
    ["Eraser", "E"],
    ["Brush size", "+ -"],
    ["New layer", "N"],
    ["Remove last layer", "R"],
    ["Change bg color", "C"],
    ["Drag around canvas", "Middle mouse button"]
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        Help
      </Typography>
      {helpArr.map(([desc, shorcut]) => {
        return (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <Typography sx={{ mt: 0.5 }}>{desc}</Typography>
            <Typography sx={{ mt: 0.5 }} style={{ width: "40%" }}>
              {shorcut}
            </Typography>
          </Stack>
        );
      })}
    </Box>
  );
};

export default HelpMenu;
