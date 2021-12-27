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
import ResetPassword from "./popups/ResetPassword";
import NavDrawer from "./components/NavDrawer";

const App = () => {
  const { isNavDrawer } = useSelector(({ componentReducer }) => componentReducer);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/student" element={<Student />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/popup/password-reset" element={<ResetPassword />} />
        </Routes>
        {isNavDrawer && <NavDrawer />}
      </BrowserRouter>
    </LocalizationProvider>
  );
};

export default App;
