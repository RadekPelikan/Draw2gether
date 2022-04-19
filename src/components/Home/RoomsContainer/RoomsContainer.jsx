import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { CanvasCard } from "../CanvasCard";
import { Link } from "react-router-dom";
import { SocketContext } from "../../../Context/socket";

const RoomsContainer = ({ rooms, user, room, setRoom }) => {
  const socket = useContext(SocketContext);

  const joinRoom = (id) => {
    console.log(user);
    const data = {
      room: { id },
      user,
    };
    socket.emit("room:user-join", data);
  };

  useEffect(() => {
    socket.on("room:user-join:done", ({ room }) => {
      setRoom(room)
    });
  }, []);

  return (
    <>
      <div className="rooms-container">
        {rooms.map((room, index) => (
          <div key={index}>
            <Link
              to={room.id + ""}
              className="card"
              style={{ color: "inherit", textDecoration: "inherit" }}
              onClick={() => joinRoom(room.id)}
            >
              <CanvasCard room={room} />
            </Link>
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
