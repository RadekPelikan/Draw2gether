import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  FormControlLabel,
  Paper,
  Switch,
  Fade,
  Button,
  TextField,
} from "@mui/material";
import { CanvasCard } from "../../components";
import { SocketContext } from "../../Context/socket";
import RoomsContainer from "../../components/Home/RoomsContainer/RoomsContainer";
import { useNavigate } from "react-router-dom";

const HomePage = ({ user, room, setRoom }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);
  const socket = useContext(SocketContext);

  const createRoom = () => {
    const room = {
      name: roomName,
    };
    socket.emit("room:create", { room });
  };

  useEffect(() => {
    socket.on("room:get:done", (data) => {
      setRooms(data.rooms);
    });

    socket.on("room:create:done", (data) => {
      setRooms(data.rooms);
    });

    socket.emit("room:get");
    if (!room) return;
    socket.emit("room:user-left", { room, user });
  }, []);

  return (
    <>
      <Container>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(e) => setRoomName(e.target.value)}
        />
        <Button variant="contained" onClick={createRoom}>
          create room
        </Button>
        <RoomsContainer
          rooms={rooms}
          user={user}
          room={room}
          setRoom={setRoom}
        />
      </Container>
    </>
  );
};

export default HomePage;
