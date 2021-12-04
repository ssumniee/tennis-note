import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";

const rates = { num: 1, name: 2, tel: 4, teacher: 2, start: 3, days: 2, count: 3 };
const sum = Object.keys(rates).reduce((acc, cur) => acc + rates[cur], 0);
const onlyPCSum = rates.teacher;

const CellContainer = styled.th`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 2.5rem;
  padding: 0.25rem;
  ${(props) => css`
    flex: ${rates[props.content] / sum} ${rates[props.content] / sum} 0;
    min-width: ${(rates[props.content] / sum) * 100}%;
    ${media.lessThan("small")`
      flex: ${rates[props.content] / (sum - onlyPCSum)} ${
      rates[props.content] / (sum - onlyPCSum)
    } 0;
      min-width: ${(rates[props.content] / sum) * 100}%;
    `}
  `}
  border-left: 1px solid var(--color-lightgray);
  ${(props) => {
    if (props.content === "num")
      return css`
        max-width: 2rem;
        border-left: none;
      `;
    if (props.content === "teacher")
      return css`
        ${media.lessThan("small")`
          display: none;
        `}
      `;
  }}
  .content {
    display: flex;
    ${(props) => {
      if (props.content === "num")
        return css`
          justify-content: flex-end;
        `;
      if (props.content === "count")
        return css`
          justify-content: space-around;
        `;
      if (props.content === "edit")
        return css`
          padding: 0 0.25rem;
        `;
    }}
  }
`;

const Content = styled.div`
  text-align: left;
  width: 100%;
  overflow-wrap: break-word;
  padding: 0 0.75rem;
  ${media.lessThan("medium")`
    padding: 0 0.25rem;
  `}
`;

const Cell = ({ content, isOnHead, children }) => {
  return (
    <CellContainer content={content} isOnHead={isOnHead}>
      <Content className="content">{children}</Content>
    </CellContainer>
  );
};

Cell.defalutProps = {
  isOnHead: false,
};

Cell.propTypes = {
  content: PropTypes.string.isRequired,
  isOnHead: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]).isRequired,
};

export default Cell;
