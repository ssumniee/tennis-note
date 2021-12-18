import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";
import { IoCloseCircle } from "react-icons/io5";

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
  font-size: 0.875rem;
  .clear {
    width: 0.875rem;
    height: 0.875rem;
    margin-right: 0.5rem;
    ${media.lessThan("medium")`
      display: none;
    `}
  }
  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize}rem;
      .clear {
        width: ${props.fontSize}rem;
        height: ${props.fontSize}rem;
      }
    `}
`;

const InputInner = styled.input`
  flex: 1 1 0;
  width: calc(100% - 2rem);
  height: 100%;
  padding: 0 0.5rem;
`;

const ClearBtn = styled.button`
  font-size: 1.15em;
  position: relative;
  color: var(--color-lightgray);
  :hover {
    color: var(--color-gray);
  }
  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const TextInput = ({ className, content, inputValue, setInputValue, fontSize, placeholder }) => {
  const input = useRef(null);

  useEffect(() => {
    setInputValue((prevState) => ({ ...prevState, [content]: inputValue || "" }));
  }, []);

  const handleInputChange = (event) => {
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
        setInputValue((prevState) => ({ ...prevState, [content]: event.target.value }));
        break;
    }
  };

  const handleInputClear = () => {
    setInputValue((prevState) => ({ ...prevState, [content]: "" }));
  };

  return (
    <InputContainer
      className={className}
      fontSize={fontSize}
      tabIndex="0"
      onFocus={() => {
        input.current.focus();
      }}
    >
      <InputInner
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        tabIndex="-1"
        ref={input}
      />
      {!!inputValue && (
        <ClearBtn type="button" className="clear" onClick={handleInputClear} tabIndex="-1">
          <IoCloseCircle />
        </ClearBtn>
      )}
    </InputContainer>
  );
};

TextInput.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  fontSize: PropTypes.number,
  placeholder: PropTypes.string,
};

export default TextInput;
