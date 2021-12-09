import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MenuItem, Select } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const SelectContainer = styled.div`
  border: 1px solid var(--color-lightblue);
  border-radius: 0.25rem;
  width: 100%;
  height: 100%;
  :focus,
  :hover,
  :active {
    border: 1px solid var(--color-blue);
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* mui 스타일 커스텀 */
  .MuiOutlinedInput-root {
    border: none;
    width: 100%;
    height: 100%;
    * {
      font-family: Interop-Regular;
      font-size: 0.875rem;
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
    width: 1.25rem;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0.25rem;
  }
`;

const MultiSelectInput = ({ content, list, inputValue, setInputValue, placeholder }) => {
  return (
    <SelectContainer>
      <Select
        multiple
        fullWidth
        displayEmpty
        IconComponent={KeyboardArrowDownRoundedIcon}
        placeholder={placeholder}
        value={inputValue}
        onChange={(event) => {
          setInputValue((prevState) => ({
            ...prevState,
            [content]: [...event.target.value].sort((a, b) => a - b),
          }));
        }}
        renderValue={(inputValue) =>
          inputValue.map((id) => list.find((item) => item.id === id)?.name)?.join(", ") || ""
        }
      >
        {list.map((item, idx) => (
          <MenuItem key={idx} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </SelectContainer>
  );
};

MultiSelectInput.propTypes = {
  content: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  inputValue: PropTypes.arrayOf(PropTypes.number).isRequired,
  setInputValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default MultiSelectInput;
