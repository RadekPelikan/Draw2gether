import { Typography } from "@mui/material";
import React from "react";

const ErrorPage = () => {
  return (
    <>
      <Typography
        variant="h3"
        component="div"
        gutterBottom
        style={{
          marginTop: "1em",
          color: "#ea5050",
          fontWeight: "600",
          textAlign: "center"
        }}
      >
        Not found 404
      </Typography>
    </>
  );
};

export default ErrorPage;
