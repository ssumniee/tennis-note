import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { isLogin } = useSelector(({ authReducer }) => authReducer);

  useEffect(() => {
    navigate("/", { replace: true });
  }, [isLogin]);

  return <div></div>;
};

export default Home;
