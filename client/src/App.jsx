import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Signing";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import Schedule from "./pages/Schedule";
import Sales from "./pages/Sales";
import Mypage from "./pages/Mypage";
import Header from "./components/Header";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import koLocale from "date-fns/locale/ko";
import ResetPwPopup from "./windows/ResetPwPopup";
import NavModal from "./windows/NavModal";
import ResetPwModal from "./windows/ResetPwModal";

const App = () => {
  const { isNavModal, isResetPwModal } = useSelector(({ windowReducer }) => windowReducer);
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
          <Route
            path="/mypage"
            element={
              <>
                <Header />
                <Mypage />
              </>
            }
          />
          <Route path="/popup/password-reset" element={<ResetPwPopup />} />
        </Routes>
        {isNavModal && <NavModal />}
        {isResetPwModal && <ResetPwModal />}
      </BrowserRouter>
    </LocalizationProvider>
  );
};

export default App;
