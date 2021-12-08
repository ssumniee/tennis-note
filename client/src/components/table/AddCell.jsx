import React from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";
import TextInput from "./input/TextInput";
import NumberInput from "./input/NumberInput";
import SelectInput from "./input/SelectInput";
import MultiSelectInput from "./input/MultiSelectInput";
import DatePickerInput from "./input/DatePickerInput";
import { MdCancel } from "react-icons/md";

const rates = { num: 1, name: 2, tel: 4, teacher_id: 3, start_date: 4, days: 3, duration: 3 };
const sum = Object.keys(rates).reduce((acc, cur) => acc + rates[cur], 0);
const onlyPCSum = sum - (rates.num + rates.teacher_id);

const InputContainer = styled.th`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 2.5rem;
  padding: 0.25rem;
  border-right: 1px solid var(--color-lightgray);
  ${(props) => css`
    flex: ${rates[props.content] / sum} ${rates[props.content] / sum} 0;
    min-width: calc(${rates[props.content] / sum} * (100% - 4.5rem));
    ${media.lessThan("small")`
      flex: ${rates[props.content] / onlyPCSum} ${rates[props.content] / onlyPCSum} 0;
      min-width: calc(${rates[props.content] / onlyPCSum} * (100% - 4.5rem));
    `}
  `}
  ${(props) => {
    if (props.content === "num")
      return css`
        max-width: 2rem;
        border-left: none;
        ${media.lessThan("small")`
          display: none;
        `}
      `;
    if (props.content === "teacher_id")
      return css`
        ${media.lessThan("small")`
          display: none;
        `}
      `;
  }}
  position: relative;
  .content {
    display: flex;
    ${(props) => {
      if (props.content === "num")
        return css`
          width: 100%;
          padding: 0 0.25rem;
          justify-content: center;
        `;
      if (props.content === "duration")
        return css`
          justify-content: space-around;
        `;
    }}
  }
`;

const Label = styled.label`
  font-size: 0.75rem;
  top: -0.5rem;
  transform: translateY(-100%);
  position: absolute;
  padding: 0 0.25rem;
  display: flex;
  .required {
    margin: 0 0.125rem;
    color: var(--color-blue);
  }
`;

const ClearBtn = styled.button`
  display: flex;
  color: var(--color-lightgray);
  :hover {
    color: var(--color-gray);
  }
  position: absolute;
  ${(props) => {
    switch (props.content) {
      case "start_date":
        return css`
          right: 2.25rem;
        `;
      case "days":
        return css`
          right: 2rem;
        `;
      case "teacher_id":
        return css`
          right: 2rem;
        `;
      case "duration":
        return css`
          display: none;
        `;
      default:
        return css`
          right: 0.75rem;
        `;
    }
  }};
`;

const AddCell = ({ content, newUserInfo, setNewUserInfo, label }) => {
  const { teachers: teacherList, days: dayList } = useSelector(({ tableReducer }) => tableReducer);

  const handleInputClear = () => {
    switch (content) {
      case "num":
        break;
      case "days":
        setNewUserInfo((prevState) => ({ ...prevState, [content]: [] }));
        break;
      case "start_date":
        setNewUserInfo((prevState) => ({ ...prevState, [content]: null }));
        break;
      default:
        setNewUserInfo((prevState) => ({ ...prevState, [content]: "" }));
        break;
    }
  };

  return (
    <InputContainer content={content}>
      <Label>
        {label}
        {content === "name" && <div className="required">*</div>}
      </Label>
      {(content === "name" || content === "tel") && (
        <TextInput
          className="content"
          content={content}
          inputValue={newUserInfo[content]}
          setInputValue={setNewUserInfo}
        />
      )}
      {content === "start_date" && (
        <DatePickerInput
          className="content"
          content={content}
          inputValue={newUserInfo.start_date}
          setInputValue={setNewUserInfo}
        />
      )}
      {content === "teacher_id" && (
        <SelectInput
          className="content"
          content={content}
          inputValue={newUserInfo.teacher_id}
          setInputValue={setNewUserInfo}
          list={teacherList}
        />
      )}
      {content === "days" && (
        <MultiSelectInput
          className="content"
          content={content}
          list={dayList}
          inputValue={newUserInfo.days}
          setInputValue={setNewUserInfo}
        />
      )}
      {content === "duration" && (
        <NumberInput
          className="content"
          content={content}
          inputValue={newUserInfo.duration}
          setInputValue={setNewUserInfo}
        />
      )}
      {content === "num" && <div className="content">{newUserInfo.num}</div>}
      {content !== "num" &&
        content !== "duration" &&
        (content === "days"
          ? newUserInfo[content].length > 0 && (
              <ClearBtn onClick={handleInputClear} content={content}>
                <MdCancel />
              </ClearBtn>
            )
          : !!newUserInfo[content] && (
              <ClearBtn onClick={handleInputClear} content={content}>
                <MdCancel />
              </ClearBtn>
            ))}
    </InputContainer>
  );
};

AddCell.propTypes = {
  content: PropTypes.string.isRequired,
  newUserInfo: PropTypes.exact({
    num: PropTypes.string,
    name: PropTypes.string,
    teacher_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tel: PropTypes.string,
    start_date: PropTypes.string,
    days: PropTypes.arrayOf(PropTypes.number),
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  setNewUserInfo: PropTypes.func,
  label: PropTypes.string,
};

export default AddCell;
