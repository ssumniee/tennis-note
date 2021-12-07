import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";

const InputContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .value {
    margin: 0 0.25rem;
  }
`;

const PlusMinus = styled.button`
  font-size: 0.875rem;
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

const PlainInput = ({ content, inputValue, setInputValue }) => {
  const handleInputMinus = () => {
    setInputValue((prevState) => ({ ...prevState, count: prevState.count - 1 }));
  };
  const handleInputPlus = () => {
    setInputValue((prevState) => ({ ...prevState, count: prevState.count + 1 }));
  };

  return (
    <InputContainer>
      {content === "count" && (
        <>
          <PlusMinus onClick={handleInputMinus} disabled={inputValue <= 0}>
            <HiOutlineMinusSm />
          </PlusMinus>
          <div className="value">{inputValue}</div>
          <PlusMinus onClick={handleInputPlus}>
            <HiOutlinePlusSm />
          </PlusMinus>
        </>
      )}
    </InputContainer>
  );
};

PlainInput.propTypes = {
  content: PropTypes.string.isRequired,
  inputValue: PropTypes.PropTypes.number.isRequired,
  setInputValue: PropTypes.func.isRequired,
};

export default PlainInput;
