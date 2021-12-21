import React from "react";
import PropTypes from "prop-types";

const ResetPwBtn = ({ className }) => {
  const openPasswordResetPopup = ({ width = 500, height = 400 }) => {
    const popupWidth = width;
    const popupHeight = height;
    const popupX = (window.screen.width - width) / 2;
    const popupY = (window.screen.height - height) / 2;
    const windowOptions = `width=${popupWidth}, height=${popupHeight}, top=${popupY}, left=${popupX}`;
    window.open("/popup/password-reset", "password reset popup", windowOptions);
  };

  return (
    <span className={className} onClick={openPasswordResetPopup}>
      비밀번호를 잊어버리셨나요?
    </span>
  );
};

ResetPwBtn.propTypes = {
  className: PropTypes.string,
};

export default ResetPwBtn;
