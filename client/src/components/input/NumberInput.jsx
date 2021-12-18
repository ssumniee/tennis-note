import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";

const InputContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .input {
    width: calc(100% - 4rem);
    padding: 0 0.25rem;
    text-align: center;
  }
  .input,
  input {
    ${(props) =>
      props.fontSize
        ? css`
            font-size: ${props.fontSize}rem;
          `
        : css`
            font-size: 0.875rem;
          `}
  }
`;

const PlusMinus = styled.button`
  flex: 0 0 1;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid var(--color-lightblue);
  margin: 0 0.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: 1rem;
`;

const NumberInput = ({ className, content, inputValue, setInputValue, fontSize }) => {
  const input = useRef(null);
  const plus = useRef(null);
  const minus = useRef(null);
  const [displayed, setDisplayed] = useState(inputValue ? String(inputValue) : "0");

  const handleInputMinus = () => {
    setInputValue((prevState) => ({ ...prevState, [content]: prevState[content] - 1 }));
  };

  const handleInputPlus = () => {
    setInputValue((prevState) => ({ ...prevState, [content]: prevState[content] + 1 }));
  };

  useEffect(() => {
    setDisplayed(String(inputValue));
  }, [inputValue]);

  return (
    <InputContainer className={className} fontSize={fontSize}>
      <PlusMinus type="button" onClick={handleInputMinus} disabled={inputValue <= 0} ref={minus}>
        <HiOutlineMinusSm />
      </PlusMinus>
      <input
        ref={input}
        className="input"
        onFocus={() => {
          minus.current.disabled = true;
          plus.current.disabled = true;
        }}
        onBlur={() => {
          setInputValue((prevState) => ({
            ...prevState,
            [content]: displayed ? Number(displayed) : 0,
          }));
          minus.current.disabled = false;
          plus.current.disabled = false;
        }}
        type="text"
        value={displayed}
        onChange={(event) => {
          setDisplayed(event.target.value.replace(/[^0-9]/g, ""));
        }}
      />
      <PlusMinus type="button" onClick={handleInputPlus} ref={plus}>
        <HiOutlinePlusSm />
      </PlusMinus>
    </InputContainer>
  );
};

NumberInput.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string.isRequired,
  inputValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setInputValue: PropTypes.func.isRequired,
  fontSize: PropTypes.number,
};

export default NumberInput;
