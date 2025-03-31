import React, { useContext, useState } from "react";
import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import { SocketContext } from "../../../Context/socket";

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
const PasswordMenu = ({ user, toJoin }) => {
  const [password, setPassword] = useState("");
  const socket = useContext(SocketContext);

  const joinRoom = () => {
    const data = {
      room: { id: toJoin },
      user,
      password
    };
    socket.emit("room:user-join", data);
  };

  return (
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        Create room
      </Typography>
      <Stack spacing={2}>
        <TextField
          required
          label="Password"
          variant="standard"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={joinRoom}>
          Join
        </Button>
      </Stack>
    </Box>
  );
};

export default PasswordMenu;
