import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authApi from "../api/auth";
import { loginAction, logoutAction } from "../store/actions";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, name, tel, isLogin } = useSelector(({ authReducer }) => authReducer);

  useEffect(() => {
    const checkValidUser = async () => {
      try {
        const res = await authApi.me();
        if (res.status === 200) {
          dispatch(loginAction(res.data));
        }
      } catch (error) {
        // 토큰 만료의 경우 error.response.status가 403인 경우를 조건으로 -> 로그아웃 후 Signing으로 리디렉션
        // 다만, res.data가 제대로 넘어오지 않은 경우 등의 예외적인 에러에 대해서도 로그아웃 후 리디렉션 시키기 위해 조건문 생략
        dispatch(logoutAction);
        navigate("/", { replace: true });
      }
    };
    checkValidUser();
  }, []);

  return (
    <div>
      <div>{`isLogin: ${isLogin}`}</div>
      <div>{`id: ${id}`}</div>
      <div>{`name: ${name}`}</div>
      <div>{`tel: ${tel}`}</div>
    </div>
  );
};

export default Home;
