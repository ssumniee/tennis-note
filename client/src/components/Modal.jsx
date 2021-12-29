import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { windowOffAction } from "../store/actions";
import { IoClose } from "react-icons/io5";

const ModalContainer = styled.div`
  position: absolute;
  inset: 0 0 0 auto;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-white);
  padding: 2rem 1rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  flex: 0 0 1;
  width: 2rem;
  height: 2rem;
  font-size: 1.5rem;
  padding: 0.25rem;
`;

const ModalInnerContainer = styled.div`
  margin: 4rem 0.5rem;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
`;

function ModalWrapper({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      left: 0;
      right: 0;
    `;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `
        position: static;
        top: unset;
        left: unset;
        right: unset;
      `;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);

  return (
    <ModalContainer>
      <CloseButton
        onClick={() => {
          dispatch(windowOffAction);
        }}
      >
        <IoClose />
      </CloseButton>
      <ModalInnerContainer>{children}</ModalInnerContainer>
    </ModalContainer>
  );
}

ModalWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]),
};

export default ModalWrapper;
