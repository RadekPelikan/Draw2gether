import React, { useState } from "react";
import CanvasPage from "./pages/CanvasPage";
import { Route, Routes } from "react-router-dom";

const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route exact index element={CanvasPage}/>
      </Routes>
      <CanvasPage/>
    </div>
  );
};

export default App;
