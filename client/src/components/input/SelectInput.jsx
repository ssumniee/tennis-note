import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";
import { IoCloseCircle } from "react-icons/io5";
import { MenuItem, Select } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const SelectContainer = styled.div`
  border: 1px solid var(--color-lightblue);
  border-radius: 0.25rem;
  width: 100%;
  height: 100%;
  :hover,
  :active,
  :focus-within {
    border: 1px solid var(--color-blue);
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  /* mui 스타일 커스텀 */
  .MuiOutlinedInput-root {
    border: none;
    flex: 1 1 0;
    height: 100%;
    * {
      font-family: Interop-Regular;
      font-size: 0.875rem;
      ${(props) =>
        props.fontSize &&
        css`
          font-size: ${props.fontSize}rem;
        `}
      border: none;
      padding: 0;
    }
  }
  .MuiSelect-select {
    padding: 0 1.75rem 0 0.5rem !important;
    display: flex;
    align-items: center;
  }
  .MuiSvgIcon-root {
    padding: 0 0.125rem;
    font-size: 1.5rem;
    border-radius: 1.5rem;
    position: absolute;
    top: calc((100% - 1.5rem) * 0.5);
    right: 0.25rem;
    :focus {
      background-color: var(--color-lightgray);
    }
  }
  .arrow {
    border-radius: 2rem;
    /* top: 0; */
    bottom: 0.25rem;
    :focus {
      background-color: var(--color-lightgray);
    }
  }
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

const SelectInput = ({
  className,
  content,
  list,
  inputValue,
  setInputValue,
  fontSize,
  placeholder,
}) => {
  const handleInputClear = () => {
    setInputValue((prevState) => ({ ...prevState, [content]: "" }));
  };

  return (
    <SelectContainer className={className} fontSize={fontSize} tabIndex="0">
      <Select
        displayEmpty
        IconComponent={KeyboardArrowDownRoundedIcon}
        placeholder={placeholder}
        value={inputValue}
        onChange={(event) => {
          setInputValue((prevState) => ({
            ...prevState,
            [content]: event.target.value,
          }));
        }}
        renderValue={(inputValue) =>
          inputValue ? list.find((item) => item.id === inputValue).name : ""
        }
        inputProps={{ tabIndex: "-1" }}
      >
        {list.map((item, idx) => (
          <MenuItem key={idx} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {!!inputValue && (
        <ClearBtn type="button" className="clear" onClick={handleInputClear} tabIndex="-1">
          <IoCloseCircle />
        </ClearBtn>
      )}
    </SelectContainer>
  );
};

SelectInput.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  inputValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setInputValue: PropTypes.func.isRequired,
  fontSize: PropTypes.number,
  placeholder: PropTypes.string,
};

export default SelectInput;
