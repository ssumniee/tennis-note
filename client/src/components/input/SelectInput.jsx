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
  position: relative;
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
    padding: 0 0.125rem;
    margin: 0.25rem 0;
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 0;
    right: 0.25rem;
  }
`;

const SelectInput = ({ content, list, inputValue, setInputValue, placeholder }) => {
  return (
    <SelectContainer>
      <Select
        fullWidth
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
        renderValue={(inputValue) => list.find((item) => item.id === inputValue)?.name || ""}
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

SelectInput.propTypes = {
  content: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  inputValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setInputValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SelectInput;
