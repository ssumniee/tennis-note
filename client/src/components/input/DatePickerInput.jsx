import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";
import { IoCloseCircle } from "react-icons/io5";
import { Stack, Box } from "@mui/material";
import { DatePicker } from "@mui/lab";
// import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
// import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';

const DatePickerContainer = styled.div`
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

const DatePickerInput = ({
  className,
  content,
  inputValue,
  setInputValue,
  fontSize,
  placeholder,
}) => {
  const [selected, setSelected] = useState(null);

  const handleInputClear = () => {
    setInputValue((prevState) => ({ ...prevState, [content]: null }));
  };

  useEffect(() => {
    setSelected(inputValue ? new Date(inputValue) : null);
  }, [inputValue]);

  useEffect(() => {
    if (selected !== null) {
      // 날짜 포맷 정제: yyyy-MM-dd
      const year = selected?.getFullYear().toString();
      const month = (selected?.getMonth() + 1).toString();
      const date = selected?.getDate().toString();
      setInputValue((prevState) => ({
        ...prevState,
        [content]: `${year}-${month.length === 1 ? 0 + month : month}-${
          date.length === 1 ? 0 + date : date
        }`,
      }));
    }
  }, [selected]);

  return (
    <DatePickerContainer className={className} fontSize={fontSize} tabIndex="0">
      <Stack sx={{ flex: "1 1 0" }}>
        <DatePicker
          reduceAnimations={true}
          allowSameDateSelection
          showDaysOutsideCurrentMonth
          views={["day"]}
          value={selected}
          onChange={(newSelected) => {
            setSelected(newSelected);
          }}
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 0.25rem 0 0.5rem",
                fontFamily: "Interop-Regular",
                fontSize: fontSize ? `${fontSize}rem` : "0.875rem",
                input: {
                  width: "calc(100% - 2rem)",
                },
                position: "relative",
                div: {
                  padding: "0",
                  margin: "0",
                  button: {
                    position: "absolute",
                    right: "0.25rem",
                    padding: "0.25rem",
                    margin: "0",
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    svg: {
                      width: "1rem",
                      height: "1rem",
                    },
                  },
                },
              }}
            >
              <input ref={inputRef} {...inputProps} readOnly placeholder={placeholder} />
              {InputProps?.endAdornment}
            </Box>
          )}
          mask="____. __. __"
          inputFormat="yyyy. MM. dd"
          tabIndex="-1"
        ></DatePicker>
      </Stack>
      {!!inputValue && (
        <ClearBtn type="button" className="clear" onClick={handleInputClear} tabIndex="-1">
          <IoCloseCircle />
        </ClearBtn>
      )}
    </DatePickerContainer>
  );
};

DatePickerInput.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string.isRequired,
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func.isRequired,
  fontSize: PropTypes.number,
  placeholder: PropTypes.string,
};

export default DatePickerInput;
