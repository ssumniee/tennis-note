import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Signing";
import Home from "./pages/Home";
import Header from "./components/Header";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import koLocale from "date-fns/locale/ko";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
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
    </LocalizationProvider>
  );
};

export default App;
