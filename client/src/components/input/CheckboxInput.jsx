import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { BsCheckLg } from "react-icons/bs";

const InputContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0.5rem 0;
  #is_admin {
    display: none;
  }
  ${(props) =>
    props.checked
      ? css`
          .checkbox {
            background-color: var(--color-blue);
          }
          .description {
            opacity: 1;
          }
        `
      : css`
          .checkbox {
            background-color: var(--color-white);
          }
          .description {
            opacity: 0.6;
          }
        `}
  ${(props) =>
    props.fontSize
      ? css`
          p {
            font-size: ${props.fontSize}rem;
          }
          label {
            width: ${props.fontSize + 0.125}rem;
            height: ${props.fontSize + 0.125}rem;
          }
        `
      : css`
          p {
            font-size: 0.875rem;
          }
          label {
            width: 1rem;
            height: 1rem;
          }
        `}
`;

const Label = styled.label`
  padding: 0.125rem;
  border: 1px solid var(--color-blue);
  color: var(--color-white);
  border-radius: 0.125rem;
  display: flex;
  align-items: center;
  justify-items: center;
  cursor: pointer;
  :active {
    background-color: var(--color-blue);
  }
  :hover {
    opacity: 0.6;
  }
`;

const Description = styled.p`
  margin-left: 0.5rem;
  font-family: Interop-Regular;
`;

const CheckboxInput = ({
  className,
  content,
  inputValue,
  setInputValue,
  description,
  fontSize,
}) => {
  return (
    <InputContainer checked={inputValue} className={className} fontSize={fontSize} tabIndex="0">
      <Label className="checkbox" htmlFor="is_admin">
        {inputValue && <BsCheckLg />}
      </Label>
      <Description className="description">{description}</Description>
      <input
        id="is_admin"
        type="checkbox"
        onChange={(event) => {
          setInputValue(
            content
              ? (prevState) => ({ ...prevState, [content]: event.target.checked })
              : event.target.checked
          );
        }}
        tabIndex="-1"
      />
    </InputContainer>
  );
};

CheckboxInput.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  inputValue: PropTypes.bool.isRequired,
  setInputValue: PropTypes.func.isRequired,
  description: PropTypes.string,
  fontSize: PropTypes.number,
};

export default CheckboxInput;
