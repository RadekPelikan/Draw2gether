import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Logo } from "./components";
import { HomePage, CanvasPage } from "./pages";
import { SocketContext } from "./Context/socket";

const App = () => {
  const socket = useContext(SocketContext);
  const [user, setUser] = useState({});
  const [room, setRoom] = useState({});

  useEffect(() => {
    socket.on("user:created", ({ user }) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="App">
      <Logo />
      <Routes>
        <Route
          exact
          index
          element={<HomePage user={user} room={room} setRoom={setRoom} />}
        />
        <Route
          path=":id"
          element={<CanvasPage user={user} room={room} setRoom={setRoom} />}
        />
      </Routes>
    </div>
  );
};

export default App;
