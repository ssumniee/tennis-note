import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MdEventAvailable, MdEditCalendar } from "react-icons/md";

const DatePickerContainer = styled.div`
  flex: 1 1 0;
  height: 100%;
  position: relative;
`;

const Displayed = styled.div`
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
    font-size: 1rem;
  }
`;

const Popup = styled.div`
  position: absolute;
  top: calc(100% + 0.125rem);
  width: calc(100% - 0.5rem);
  background-color: var(--color-white);
  border-radius: 0.25rem;
  z-index: 1;
  border: 1px solid var(--color-blue);
  padding: 0.25rem 0.5rem;
`;

const DatePicker = ({ content, value, setValue }) => {
  const [displayed, setDisplayed] = useState(value);
  const [popupShown, setPopupShown] = useState(false);

  useEffect(() => {
    if (content === "start_date") setDisplayed(value.split("-").join(". "));
  }, [value]);

  return (
    <DatePickerContainer>
      <Displayed>
        {displayed}
        <button
          className="btn"
          onClick={() => {
            setPopupShown(!popupShown);
          }}
        >
          {popupShown ? <MdEventAvailable /> : <MdEditCalendar />}
        </button>
      </Displayed>
      {popupShown && <Popup>팝업창</Popup>}
    </DatePickerContainer>
  );
};

DatePicker.propTypes = {
  content: PropTypes.string.isRequired,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};

export default DatePicker;
