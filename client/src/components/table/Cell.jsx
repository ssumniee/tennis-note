import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";

const rates = { num: 1, name: 2, tel: 4, teacher: 2, start: 3, days: 2, count: 2 };
const sum = Object.keys(rates).reduce((acc, cur) => acc + rates[cur], 0);

const CellContainer = styled.th`
  display: flex;
  width: 100%;
  padding: 0.25rem;
  ${(props) => css`
    flex: ${rates[props.id] / sum} ${rates[props.id] / sum} 0;
    min-width: ${(rates[props.id] / sum) * 100}%;
  `}
  border-left: 1px solid var(--color-lightgray);
  ${(props) => {
    if (props.id === "num")
      return css`
        max-width: 3rem;
        border-left: none;
      `;
    if (props.id === "teacher")
      return css`
        ${media.lessThan("small")`
            display: none;
          `}
      `;
  }}
  .content {
    display: flex;
    ${(props) => {
      if (props.id === "num")
        return css`
          justify-content: right;
        `;
      if (props.id === "count")
        return css`
          justify-content: space-around;
        `;
    }}
  }
`;

const Content = styled.div`
  text-align: left;
  width: 100%;
  overflow-wrap: break-word;
  padding: 0.375rem 0.75rem;
  ${media.lessThan("medium")`
    padding: 0.5rem 0.25rem;
  `}
`;

const Cell = ({ id, isOnHead, children }) => {
  return (
    <CellContainer id={id} isOnHead={isOnHead}>
      <Content className="content">{children}</Content>
    </CellContainer>
  );
};

Cell.defalutProps = {
  isOnHead: false,
};

Cell.propTypes = {
  id: PropTypes.string.isRequired,
  isOnHead: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]).isRequired,
};

export default Cell;
