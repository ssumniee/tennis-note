import React from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";
import TextInput from "../input/TextInput";
import NumberInput from "../input/NumberInput";
import SelectInput from "../input/SelectInput";
import MultiSelectInput from "../input/MultiSelectInput";
import DatePickerInput from "../input/DatePickerInput";

const rates = { name: 2, tel: 4, teacher_id: 3, start_date: 4, days: 3, count: 3 };
const sum = Object.keys(rates).reduce((acc, cur) => acc + rates[cur], 0);
const onlyPCSum = sum - rates.teacher_id;

const CellContainer = styled.th`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 2.5rem;
  padding: 0.25rem;
  border-right: 1px solid var(--color-lightgray);
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
  }
  ${(props) => {
    if (props.content === "count")
      return css`
        .content {
          justify-content: center;
        }
        ${media.lessThan("medium")`
          border: none;
        `}
      `;
  }}
`;

const Content = styled.div`
  text-align: left;
  flex: 1 1 0;
  overflow-wrap: break-word;
  font-family: Interop-Medium;
  padding: 0 0.5rem;
  ${media.lessThan("medium")`
    padding: 0 0.25rem;
  `}
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

const StudentCell = ({
  content,
  isOnHead,
  isOnAdd,
  isEditing,
  tableInfo,
  setTableInfo,
  label,
  children,
}) => {
  const { teachers: teacherList, days: dayList } = useSelector(({ authReducer }) => authReducer);

  return (
    <CellContainer content={content} isOnHead={isOnHead}>
      {isOnAdd && (
        <Label>
          {label}
          {content === "name" && <div className="required">*</div>}
        </Label>
      )}
      {isOnHead ? (
        <Content className="content">{children}</Content>
      ) : !isEditing && !isOnAdd ? (
        (tableInfo[content] || tableInfo[content] >= 0) && (
          <Content className="content">
            {content === "teacher_id" || content === "days" ? (
              <>
                {content === "teacher_id" &&
                  teacherList.length &&
                  teacherList.find((teacher) => teacher.id === tableInfo.teacher_id)?.name}
                {content === "days" &&
                  dayList.length &&
                  tableInfo.days
                    .map((dayId) => dayList.find((day) => day.id === dayId)?.name)
                    .join(", ")}
              </>
            ) : (
              tableInfo[content]
            )}
          </Content>
        )
      ) : (
        <>
          {(content === "name" || content === "tel") && (
            <TextInput
              content={content}
              inputValue={tableInfo[content] || ""}
              setInputValue={setTableInfo}
              placeholder={(content === "name" && "아이디") || (content === "tel" && "전화번호")}
            />
          )}
          {content === "count" && (
            <NumberInput
              content={content}
              inputValue={tableInfo.count || 0}
              setInputValue={setTableInfo}
            />
          )}
          {content === "start_date" && (
            <DatePickerInput
              content={content}
              inputValue={tableInfo.start_date}
              setInputValue={setTableInfo}
              placeholder="시작일"
            />
          )}
          {content === "teacher_id" && (
            <SelectInput
              content={content}
              inputValue={tableInfo.teacher_id || ""}
              setInputValue={setTableInfo}
              list={teacherList}
              placeholder="강사"
            />
          )}
          {content === "days" && (
            <MultiSelectInput
              content={content}
              list={dayList}
              inputValue={tableInfo.days || []}
              setInputValue={setTableInfo}
              placeholder="수업 요일"
            />
          )}
        </>
      )}
    </CellContainer>
  );
};

StudentCell.defalutProps = {
  isOnHead: false,
  isOnAdd: false,
};

StudentCell.propTypes = {
  content: PropTypes.string.isRequired,
  isOnHead: PropTypes.bool,
  isOnAdd: PropTypes.bool,
  isEditing: PropTypes.bool,
  tableInfo: PropTypes.shape({
    id: PropTypes.number,
    club_id: PropTypes.number,
    num: PropTypes.number,
    name: PropTypes.string,
    teacher_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tel: PropTypes.string,
    start_date: PropTypes.string,
    days: PropTypes.arrayOf(PropTypes.number),
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  setTableInfo: PropTypes.func,
  label: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]),
};

export default StudentCell;
