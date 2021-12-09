import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";

const CellContainer = styled.th`
  flex: 0 0 2.5rem;
  min-height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid var(--color-lightgray);
  ${media.lessThan("medium")`
    display: none;
  `}
  padding: 0 0.25rem;
`;

const NumCell = ({ children }) => {
  return <CellContainer>{children}</CellContainer>;
};

NumCell.propTypes = {
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]),
};

export default NumCell;
