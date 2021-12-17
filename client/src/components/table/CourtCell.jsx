import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";
import TextInput from "../input/TextInput";

const rates = { name: 1 };
const sum = Object.keys(rates).reduce((acc, cur) => acc + rates[cur], 0);
const onlyPCSum = sum;

const CellContainer = styled.th`
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
    if (props.content === "onlyPC")
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
  .clear-input {
    ${media.lessThan("medium")`
      display: none;
    `}
  }
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

const CourtCell = ({
  content,
  isOnHead,
  isOnAdd,
  isEditing,
  tableInfo,
  setTableInfo,
  label,
  children,
}) => {
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
        tableInfo[content] && <Content className="content">{tableInfo[content]}</Content>
      ) : (
        <>
          {content === "name" && (
            <TextInput
              content={content}
              inputValue={tableInfo.name || ""}
              setInputValue={setTableInfo}
            />
          )}
        </>
      )}
    </CellContainer>
  );
};

CourtCell.defalutProps = {
  isOnHead: false,
  isOnAdd: false,
};

CourtCell.propTypes = {
  content: PropTypes.string.isRequired,
  isOnHead: PropTypes.bool,
  isOnAdd: PropTypes.bool,
  isEditing: PropTypes.bool,
  tableInfo: PropTypes.shape({
    id: PropTypes.number,
    num: PropTypes.number,
    name: PropTypes.string,
    club_id: PropTypes.number,
  }),
  setTableInfo: PropTypes.func,
  label: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]),
};

export default CourtCell;
