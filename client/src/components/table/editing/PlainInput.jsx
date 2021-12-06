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

const InputInner = styled.input`
  flex: 1 1 0;
  width: 100%;
  height: 100%;
  border: 1px solid var(--color-lightblue);
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  :focus,
  :active {
    border: 1px solid var(--color-blue);
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

const PlainInput = ({ content, value, setValue }) => {
  const handleInputChange = (event) => {
    setValue((prevState) => ({ ...prevState, [content]: event.target.value }));
  };
  const handleInputMinus = () => {
    setValue((prevState) => ({ ...prevState, count: prevState.count - 1 }));
  };
  const handleInputPlus = () => {
    setValue((prevState) => ({ ...prevState, count: prevState.count + 1 }));
  };

  return (
    <InputContainer>
      {content === "count" ? (
        <>
          <PlusMinus onClick={handleInputMinus} disabled={value <= 0}>
            <HiOutlineMinusSm />
          </PlusMinus>
          <div className="value">{value}</div>
          <PlusMinus onClick={handleInputPlus}>
            <HiOutlinePlusSm />
          </PlusMinus>
        </>
      ) : (
        <InputInner type="text" value={value} onChange={handleInputChange} />
      )}
    </InputContainer>
  );
};

PlainInput.propTypes = {
  content: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setValue: PropTypes.func.isRequired,
};

export default PlainInput;
