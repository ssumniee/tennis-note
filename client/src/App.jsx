import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Signing";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import Schedule from "./pages/Schedule";
import Sales from "./pages/Sales";
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
            path="/admin"
            element={
              <>
                <Header />
                <Admin />
              </>
            }
          />
          <Route
            path="/student"
            element={
              <>
                <Header />
                <Student />
              </>
            }
          />
          <Route
            path="/schedule"
            element={
              <>
                <Header />
                <Schedule />
              </>
            }
          />
          <Route
            path="/sales"
            element={
              <>
                <Header />
                <Sales />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
};

export default App;
