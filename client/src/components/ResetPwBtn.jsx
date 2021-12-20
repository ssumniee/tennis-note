import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ResetPwMessage = ({ className }) => {
  const { id: clubId } = useSelector(({ authReducer }) => authReducer);

  const openPasswordResetPopup = ({ width = 500, height = 500 }) => {
    const popupWidth = width;
    const popupHeight = height;
    const popupX = (window.screen.width - width) / 2;
    const popupY = (window.screen.height - height) / 2;
    const windowOptions = `width=${popupWidth}, height=${popupHeight}, top=${popupY}, left=${popupX}`;
    window.open(`/popup/password-reset/${clubId}`, "password reset popup", windowOptions);
  };

  return (
    <span className={className} onClick={openPasswordResetPopup}>
      비밀번호를 잊어버리셨나요?
    </span>
  );
};

ResetPwMessage.propTypes = {
  className: PropTypes.string,
};

export default ResetPwMessage;
