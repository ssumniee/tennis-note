import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Signing";
import Home from "./pages/Home";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home/:id"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
