import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";
import TextInput from "../input/TextInput";
import PasswordInput from "../input/PasswordInput";

const rates = { name: 4, password: 5, createdAt: 6 };
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

const ClubCell = ({ content, isOnHead, isEditing, tableInfo, setTableInfo, children }) => {
  return (
    <CellContainer content={content} isOnHead={isOnHead}>
      {isOnHead ? (
        <Content className="content">{children}</Content>
      ) : !isEditing || content === "createdAt" ? (
        tableInfo[content] && (
          <Content className="content">
            {content === "createdAt"
              ? `${tableInfo.createdAt.split("T")[0]} ${
                  tableInfo.createdAt.split("T")[1].split(".")[0]
                }`
              : tableInfo[content]}
          </Content>
        )
      ) : (
        <>
          {content === "name" && (
            <TextInput
              content={content}
              inputValue={tableInfo.name || ""}
              setInputValue={setTableInfo}
            />
          )}
          {content === "password" && (tableInfo.is_admin || tableInfo.temp) && (
            <PasswordInput
              content={content}
              inputValue={tableInfo.password || ""}
              setInputValue={setTableInfo}
              isAdmin={tableInfo.is_admin}
            />
          )}
        </>
      )}
    </CellContainer>
  );
};

ClubCell.defalutProps = {
  isOnHead: false,
};

ClubCell.propTypes = {
  content: PropTypes.string.isRequired,
  isOnHead: PropTypes.bool,
  isEditing: PropTypes.bool,
  tableInfo: PropTypes.shape({
    id: PropTypes.number,
    is_admin: PropTypes.bool,
    temp: PropTypes.bool,
    num: PropTypes.number,
    name: PropTypes.string,
    password: PropTypes.string,
    createdAt: PropTypes.date,
  }),
  setTableInfo: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]),
};

export default ClubCell;
