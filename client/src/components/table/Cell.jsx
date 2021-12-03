import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";

const CellContainer = styled.th`
  flex: 4 4 0;
  ${(props) => {
    switch (props.id) {
      case "num":
        return css`
          flex: 2 2 0;
        `;
      case "tel":
        return css`
          flex: 8 8 0;
        `;
      case "teacher":
        return css`
          ${media.lessThan("small")`
            display: none;
          `}
        `;
      case "start":
        return css`
          flex: 6 6 0;
        `;
      case "count":
        return css`
          flex: 3 3 0;
        `;
      default:
    }
  }}
`;

const Cell = ({ id, children }) => {
  return <CellContainer id={id}>{children}</CellContainer>;
};

Cell.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]).isRequired,
};

export default Cell;
