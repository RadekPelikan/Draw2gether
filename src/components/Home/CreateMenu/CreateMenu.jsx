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
const CreateMenu = ({ closeCreate }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [max, setMax] = useState(-1);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const socket = useContext(SocketContext);

  const createRoom = () => {
    if (name === "") return;
    const room = {
      name,
      desc,
      max,
      size: {width, height}
    };
    socket.emit("room:create", { room });
    closeCreate();
  };

  return (
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        Create room
      </Typography>
      <Stack spacing={2}>
        <TextField
          required
          label="Name"
          variant="standard"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Description"
          variant="standard"
          onChange={(e) => setDesc(e.target.value)}
        />
        <TextField
          variant="standard"
          label="Max users"
          type="number"
          onChange={(e) => setMax(e.target.value)}
          InputProps={{ inputProps: { min: 0 } }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Stack direction="row" spacing={2}>
          <TextField
            style={{ width: "100%" }}
            variant="standard"
            label="Width pixels"
            type="number"
            onChange={(e) => setWidth(e.target.value)}
            InputProps={{ inputProps: { min: 0, max: 1000 } }}
          />
          <TextField
            style={{ width: "100%" }}
            variant="standard"
            label="Height pixels"
            type="number"
            onChange={(e) => setHeight(e.target.value)}
            InputProps={{ inputProps: { min: 0, max: 1000 } }}
          />
        </Stack>
        <Button variant="contained" onClick={createRoom}>
          Create
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateMenu;
