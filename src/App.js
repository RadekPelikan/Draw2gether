import React from "react";
import { Route, Routes } from "react-router-dom";

import {HomePage, CanvasPage} from "./pages";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact index element={<HomePage />} />
        <Route path="draw" element={<CanvasPage />} />
      </Routes>
    </div>
  );
};

export default App;
