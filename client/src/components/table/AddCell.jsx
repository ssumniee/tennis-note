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

const rates = { name: 2, tel: 4, teacher_id: 3, start_date: 4, days: 3, paid: 3 };
const sum = Object.keys(rates).reduce((acc, cur) => acc + rates[cur], 0);
const onlyPCSum = sum - rates.teacher_id;

const InputContainer = styled.th`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 2.5rem;
  padding: 0.25rem;
  border-right: 1px solid var(--color-lightgray);
  :last-child {
    border: none;
  }
  ${(props) => css`
    flex: ${rates[props.content] / sum} ${rates[props.content] / sum} 0;
    min-width: calc(${rates[props.content] / sum} * (100% - 2.5rem - 4.5rem));
    ${media.lessThan("small")`
      flex: ${rates[props.content] / onlyPCSum} ${rates[props.content] / onlyPCSum} 0;
      min-width: calc(${rates[props.content] / onlyPCSum} * (100% - 2.5rem - 4.5rem));
    `}
  `}
  ${(props) => {
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
      if (props.content === "paid")
        return css`
          justify-content: space-around;
        `;
    }}
  }
  .clear-input {
    ${media.lessThan("medium")`
      display: none;
    `}
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
      case "paid":
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

const AddCell = ({ content, newStudentInfo, setNewStudentInfo, label }) => {
  const { teachers: teacherList, days: dayList } = useSelector(({ authReducer }) => authReducer);

  const handleInputClear = () => {
    switch (content) {
      case "days":
        setNewStudentInfo((prevState) => ({ ...prevState, [content]: [] }));
        break;
      case "start_date":
        setNewStudentInfo((prevState) => ({ ...prevState, [content]: null }));
        break;
      default:
        setNewStudentInfo((prevState) => ({ ...prevState, [content]: "" }));
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
          inputValue={newStudentInfo[content] || ""}
          setInputValue={setNewStudentInfo}
        />
      )}
      {content === "start_date" && (
        <DatePickerInput
          className="content"
          content={content}
          inputValue={newStudentInfo.start_date}
          setInputValue={setNewStudentInfo}
        />
      )}
      {content === "teacher_id" && (
        <SelectInput
          className="content"
          content={content}
          inputValue={newStudentInfo.teacher_id || ""}
          setInputValue={setNewStudentInfo}
          list={teacherList}
        />
      )}
      {content === "days" && (
        <MultiSelectInput
          className="content"
          content={content}
          list={dayList}
          inputValue={newStudentInfo.days}
          setInputValue={setNewStudentInfo}
        />
      )}
      {content === "paid" && (
        <NumberInput
          className="content"
          content={content}
          inputValue={newStudentInfo.paid}
          setInputValue={setNewStudentInfo}
        />
      )}
      {content !== "paid" &&
        (content === "days"
          ? newStudentInfo[content].length > 0 && (
              <ClearBtn className="clear-input" onClick={handleInputClear} content={content}>
                <MdCancel />
              </ClearBtn>
            )
          : !!newStudentInfo[content] && (
              <ClearBtn className="clear-input" onClick={handleInputClear} content={content}>
                <MdCancel />
              </ClearBtn>
            ))}
    </InputContainer>
  );
};

AddCell.propTypes = {
  content: PropTypes.string.isRequired,
  newStudentInfo: PropTypes.exact({
    num: PropTypes.string,
    name: PropTypes.string,
    teacher_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tel: PropTypes.string,
    start_date: PropTypes.string,
    days: PropTypes.arrayOf(PropTypes.number),
    paid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  setNewStudentInfo: PropTypes.func,
  label: PropTypes.string,
};

export default AddCell;
