import React /*, {  useState,  useEffect } */ from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
// import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(id, list, theme) {
  return {
    fontWeight:
      list.findIndex((item) => item.id === id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SelectContainer = styled.div`
  width: 100%;
  height: 100%;
  * {
    width: 100%;
    height: 100%;
  }
  .MuiBox-root {
  }
  .MuiFormControl-root {
  }
  .MuiOutlinedInput-root {
    border: 1px solid var(--color-lightblue);
    border-radius: 0.25rem;
    width: 100%;
    height: 100%;
    padding: 0 0.5rem;
    :focus,
    :active {
      border: 1px solid var(--color-lightblue);
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      display: flex;
      align-items: center;
    }
  }
  .MuiOutlinedInput-notchedOutline {
    // 라벨 라인
    display: none;
  }
  .MuiSelect-select {
    // 인풋 영역
    padding: 0;
    text-align: left;
    font-family: Interop-Regular;
    color: var(--color-black);
    font-size: 0.875rem;
  }
  .MuiSvgIcon-root {
    // 오픈 아이콘
    border: 1px solid red;
  }
  .MuiSvgIcon-root.MuiSelect-iconOpen {
    // 클로즈 아이콘
    border: 1px solid red;
  }
  .MuiPaper-root {
    // 팝업 배경
    background-color: red !important;
    color: var(--color-black) !important;
    inset: 0 !important;
  }
  .MuiList-root {
    // 팝업 리스트 ul
  }
  .MuiMenuItem-root {
    // 팝업 리스트 li
    font-family: Interop-Regular;
    color: var(--color-black);
    font-size: 0.875rem;
    font-weight: normal !important;
  }
`;

const StyledSelect = styled(Select)`
  & .MuiMenuItem-root {
    color: blue !important;
  }
`;

// const Displayed = styled.div`
//   border: 1px solid var(--color-lightblue);
//   border-radius: 0.25rem;
//   width: 100%;
//   height: 100%;
//   padding: 0 0.5rem;
//   :focus,
//   :active {
//     border: 1px solid var(--color-lightblue);
//   }
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   .btn {
//     display: flex;
//     align-items: center;
//   }
// `;

// const Popup = styled.div`
//   position: absolute;
//   top: calc(100% + 0.125rem);
//   width: calc(100% - 0.5rem);
//   background-color: var(--color-white);
//   border-radius: 0.25rem;
//   z-index: 1;
//   border: 1px solid var(--color-blue);
//   padding: 0.25rem 0.5rem;
// `;

const SelectInput = ({ content, list, value, setValue }) => {
  // const [displayed, setDisplayed] = useState(value);
  // const [popupShown, setPopupShown] = useState(false);

  // useEffect(() => {
  //   if (content === "days")
  //     setDisplayed(value.map((id) => list.find((item) => item.id === id).name).join(", "));
  //   if (content === "teacher_id") setDisplayed(list.find((item) => item.id === value).name);
  // }, [value]);

  const theme = useTheme();

  const handleChange = (event) => {
    // On autofill we get a the stringified value.
    setValue((prevState) => ({
      ...prevState,
      [content]:
        typeof event.target.value === "string" ? event.target.value.split(",") : event.target.value,
    }));
  };

  return (
    <SelectContainer>
      <Box>
        <FormControl>
          {/* {content === "teacher_id" && <InputLabel id="demo-simple-select-label">선생님</InputLabel>} */}
          {/* {content === "days" && <InputLabel id="demo-multiple-chip-label">요일</InputLabel>} */}
          {/* <Displayed>
          {displayed}
          <button
            className="btn"
            onClick={() => {
              setPopupShown(!popupShown);
            }}
          >
            {popupShown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </Displayed> */}
          {/* {popupShown && <Popup>팝업창</Popup>} */}
          {content === "teacher_id" && (
            <StyledSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={handleChange}
            >
              {list.map((item) => (
                <MenuItem key={item.id} value={item.id} style={getStyles(item.id, list, theme)}>
                  {item.name}
                </MenuItem>
              ))}
            </StyledSelect>
          )}
          {content === "days" && (
            <StyledSelect
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={value}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {list.map((item) => (
                <MenuItem key={item.id} value={item.id} style={getStyles(item.id, list, theme)}>
                  {item.name}
                </MenuItem>
              ))}
            </StyledSelect>
          )}
        </FormControl>
      </Box>
    </SelectContainer>
  );
};

SelectInput.propTypes = {
  content: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  setValue: PropTypes.func.isRequired,
};

export default SelectInput;
