import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";
import { IoCloseCircle } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import utilApi from "../../api/util";

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

const RefreshBtn = styled.button`
  display: flex;
  align-items: center;
  justigy-content: center;
  color: var(--color-blue);
  background-color: var(--color-lightblue);
  border-radius: 0.125rem;
  padding: 0.2rem 0.325rem;
  margin-right: 0.25rem;
  :hover {
    opacity: 0.8;
  }
`;

const PasswordInput = ({ content, inputValue, setInputValue, fontSize, isAdmin }) => {
  useEffect(() => {
    setInputValue((prevState) => ({ ...prevState, [content]: inputValue || "" }));
  }, []);

  const handleInputRefresh = async () => {
    const tempPassword = await utilApi.getTempPassword();
    setInputValue((prevState) => ({ ...prevState, [content]: tempPassword }));
  };

  const handleInputChange = (event) => {
    setInputValue((prevState) => ({ ...prevState, [content]: event.target.value }));
  };

  const handleInputClear = () => {
    setInputValue((prevState) => ({ ...prevState, [content]: "" }));
  };

  return (
    <InputContainer fontSize={fontSize}>
      <InputInner
        type="text"
        value={inputValue}
        onChange={isAdmin ? handleInputChange : undefined}
        readOnly={!isAdmin}
      />
      {isAdmin ? (
        !!inputValue && (
          <ClearBtn className="clear" onClick={handleInputClear}>
            <IoCloseCircle />
          </ClearBtn>
        )
      ) : (
        <RefreshBtn onClick={handleInputRefresh}>
          <FiRefreshCw />
        </RefreshBtn>
      )}
    </InputContainer>
  );
};

PasswordInput.defaultProps = {
  isAdmin: false,
};

PasswordInput.propTypes = {
  content: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  fontSize: PropTypes.number,
  isAdmin: PropTypes.bool,
};

export default PasswordInput;
