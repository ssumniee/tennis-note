import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const RowContainer = styled.tr`
  ${(props) =>
    !props.isOnHead &&
    css`
      border-bottom: 1px solid var(--color-lightgray);
      :last-child {
        border: none;
      }
    `}
  display: flex;
  justify-content: space-around;
`;

const Row = ({ isOnHead, children }) => {
  return <RowContainer isOnHead={isOnHead}>{children}</RowContainer>;
};

Row.defalutProps = {
  isOnHead: false,
};

Row.propTypes = {
  isOnHead: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]).isRequired,
};

export default Row;
