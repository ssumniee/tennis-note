import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border-radius: 0.25rem;
  border: 1px solid var(--color-lightblue);
  :hover,
  :active,
  :focus-within {
    border: 1px solid var(--color-blue);
  }
`;

const InputInner = styled.input`
  flex: 1 1 0;
  width: calc(100% - 2rem);
  height: 100%;
  padding: 0 0.5rem;
`;

const TextInput = ({ content, inputValue, setInputValue }) => {
  const handleInputChange = (event) => {
    setInputValue((prevState) => ({ ...prevState, [content]: event.target.value }));
  };

  const handleInputFormat = (event) => {
    switch (content) {
      case "tel":
        setInputValue((prevState) => ({
          ...prevState,
          [content]: event.target.value
            .replace(/[^0-9]/g, "")
            .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/g, "$1-$2-$3")
            .replace("--", "-"),
        }));
        break;
      default:
        break;
    }
  };

  return (
    <InputContainer>
      <InputInner
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={handleInputFormat}
      />
    </InputContainer>
  );
};

TextInput.propTypes = {
  content: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
};

export default TextInput;
