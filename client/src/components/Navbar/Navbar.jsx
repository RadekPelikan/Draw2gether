import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={2}
      className="navbar"
    >
      <Link to="">Logo</Link>
      <Link to="draw">Draw</Link>
    </Stack>
  );
};

export default Navbar;
