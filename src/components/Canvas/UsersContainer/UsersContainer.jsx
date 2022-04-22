import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../Context/socket";
import UserCard from "./UserCard";

const UsersContainer = ({room, user}) => {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // socket.off("room:user-join:done");
    socket.emit("room:user-get", {room})
    socket.on("room:user-join:done", (data) => {
      setUsers(data.users);
    });
    socket.on("room:user-get:done", (data) => {
      setUsers(data.users);
    });
  }, []);

  return (
    <>
      <div className="users-container">
        {users.map((item, index) => (
          <>
            <UserCard item={item} key={index} user={user}  />
          </>
        ))}
      </div>
    </>
  );
};

export default UsersContainer;
