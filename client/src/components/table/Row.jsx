import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";

const RowContainer = styled.tr`
  padding: 0.375rem 1rem;
  ${media.lessThan("medium")`
    padding: 0.5rem;
  `}
  ${(props) =>
    !props.isOnHead &&
    css`
      border-bottom: 1px solid var(--color-lightgray);
      :last-child {
        border: none;
      }
    `}
  display: flex;
  justify-content: space-between;
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
