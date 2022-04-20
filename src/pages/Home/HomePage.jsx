import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  FormControlLabel,
  Paper,
  Switch,
  Fade,
  Button,
  TextField,
  Modal,
} from "@mui/material";
import { CanvasCard } from "../../components";
import { SocketContext } from "../../Context/socket";
import RoomsContainer from "../../components/Home/RoomsContainer/RoomsContainer";
import { CreateMenu } from "../../components/Home/CreateMenu";
import useKeypress from "react-use-keypress";
import { useNavigate } from "react-router-dom";

const HomePage = ({ user, room, setRoom }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const joinRoom = (id) => {
    const data = {
      room: { id },
      user,
    };
    socket.emit("room:user-join", data);
  };

  useEffect(() => {
    socket.on("room:get:done", (data) => {
      setRooms(data.rooms);
    });

    socket.on("room:create:done", (data) => {
      setRooms(data.rooms);
    });
    socket.on("room:create:done:join", ({ rooms }) => {
      const data = {
        room: { id: rooms[rooms.length - 1].id },
        user,
      };
      socket.emit("room:user-join", data);
    });
    socket.on("room:user-join:done", ({ room }) => {
      setRoom(room);
      navigate(`room/${room.id}`);
    });

    socket.emit("room:get");
    if (!room) return;
    socket.emit("room:user-left", { room, user });
  }, []);

  const [openCreate, setOpenCreate] = useState(false);

  const closeCreate = () => setOpenCreate(false);
  useKeypress("Escape", () => setOpenCreate(false));

  return (
    <>
      <Modal
        open={openCreate}
        onClose={closeCreate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateMenu closeCreate={closeCreate} />
      </Modal>
      <Container>
        <Button variant="contained" onClick={() => setOpenCreate(true)}>
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
