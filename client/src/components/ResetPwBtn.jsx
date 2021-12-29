import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { resetPwModalOnAction } from "../store/actions";

const ResetPwBtn = ({ className }) => {
  const dispatch = useDispatch();
  const [onMobile, setOnMobile] = useState(false);

  const openPasswordResetPopup = (width = 500, height = 400) => {
    const popupWidth = width;
    const popupHeight = height;
    const popupX = (window.screen.width - width) / 2;
    const popupY = (window.screen.height - height) / 2;
    const windowOptions = `width=${popupWidth}, height=${popupHeight}, top=${popupY}, left=${popupX}`;
    window.open("/popup/password-reset", "password reset popup", windowOptions);
  };

  useEffect(() => {
    window.addEventListener("resize", (event) => {
      if (event.target.innerWidth > 450) {
        setOnMobile(false);
      } else {
        setOnMobile(true);
      }
    });
    return () => {
      window.removeEventListener("resize", (event) => {
        if (event.target.innerWidth > 450) {
          setOnMobile(false);
        } else {
          setOnMobile(true);
        }
      });
    };
  }, []);

  return (
    <span
      className={className}
      onClick={() => {
        if (onMobile) {
          dispatch(resetPwModalOnAction);
        } else openPasswordResetPopup();
      }}
    >
      비밀번호를 잊어버리셨나요?
    </span>
  );
};

ResetPwBtn.propTypes = {
  className: PropTypes.string,
};

export default ResetPwBtn;
