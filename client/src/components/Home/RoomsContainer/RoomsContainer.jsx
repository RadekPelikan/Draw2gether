import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CanvasCard } from "../CanvasCard";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../../Context/socket";
import useKeypress from "react-use-keypress";
import { Modal } from "@mui/material";
import PasswordMenu from "./PasswordMenu";

const RoomsContainer = ({ rooms, user, room, setRoom }) => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const [openPasword, setOpenPasword] = useState(false);
  const [toJoin, setToJoin] = useState(null);

  const closePassword = () => setOpenPasword(false);
  useKeypress("Escape", () => setOpenPasword(false));

  

  const joinRoom = (id) => {
    const roomN = rooms.filter((item) => item.id === id)[0]
    if (roomN.password) return setOpenPasword(true) && setToJoin(id);
    const data = {
      room: { id },
      user,
    };
    socket.emit("room:user-join", data);
  };

  useEffect(() => {
    socket.on("room:user-join:done", ({ room }) => {
      setRoom(room);
      navigate(`/room/${room.id}`)
    });
    socket.on("room:user-kick", () => {
      navigate("/")
    })
    
  }, []);

  return (
    <>
      <Modal
        open={openPasword}
        onClose={closePassword}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PasswordMenu user={user} toJoin={toJoin} />
      </Modal>
      <div className="rooms-container">
        {rooms.map((room, index) => (
          <div key={index}>
            <div onClick={() => joinRoom(room.id)}>
              <CanvasCard room={room} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

RoomsContainer.propTypes = {
  rooms: PropTypes.array,
};

export default RoomsContainer;
