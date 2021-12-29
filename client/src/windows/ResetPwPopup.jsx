import React from "react";
import styled from "styled-components";
import ResetPwInner from "./ResetPwInner";

const PopupContainer = styled.div`
  height: 100vh;
  margin: 0 auto;
  padding: 2rem 0 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PasswordReset = () => {
  return (
    <PopupContainer>
      <ResetPwInner />
    </PopupContainer>
  );
};

export default PasswordReset;
