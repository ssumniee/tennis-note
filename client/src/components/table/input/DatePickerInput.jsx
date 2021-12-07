import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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
`;

const DatePickerInput = ({ content, inputValue, setInputValue }) => {
  const [selected, setSelected] = useState(null);

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
    <DatePickerContainer>
      <Stack>
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
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 0.25rem 0 0.5rem",
                fontFamily: "Interop-Regular",
                fontSize: "0.875rem",
                input: {
                  width: "calc(100% - 2rem)",
                },
                div: {
                  padding: "0",
                  margin: "0",
                  button: {
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
              <input ref={inputRef} {...inputProps} readOnly placeholder="" />
              {InputProps?.endAdornment}
            </Box>
          )}
          mask="____. __. __"
          inputFormat="yyyy. MM. dd"
          // components={{
          //   LeftArrowButton: <></>,
          //   LeftArrowIcon: <></>,
          //   OpenPickerIcon: <></>,
          //   RightArrowButton: <></>,
          //   RightArrowIcon: <></>,
          //   SwitchViewButton: <></>,
          //   SwitchViewIcon: <></>,
          // }}
        ></DatePicker>
      </Stack>
    </DatePickerContainer>
  );
};

DatePickerInput.propTypes = {
  content: PropTypes.string.isRequired,
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func.isRequired,
};

export default DatePickerInput;
