import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";

const CellContainer = styled.th`
  flex: 0 0 4.5rem;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  ${media.lessThan("medium")`
    display: none;
  `}
  padding: 0 0.25rem;
  .button {
    font-size: 0.875rem;
    border-radius: 0.25rem;
    padding: 0.125rem;
    margin: 0 0.125rem;
    flex: 1 1 0;
    height: 1.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    :disabled {
      opacity: 0.4;
    }
  }
  .clear {
    color: var(--color-red);
    border: 1px solid var(--color-red);
    background-color: var(--color-palered);
    :hover {
      background-color: var(--color-lightred);
      &:disabled {
        background-color: var(--color-palered);
      }
    }
  }
  .apply {
    color: var(--color-green);
    border: 1px solid var(--color-green);
    background-color: var(--color-palegreen);
    :hover {
      background-color: var(--color-lightgreen);
      &:disabled {
        background-color: var(--color-palegreen);
      }
    }
  }
  .edit,
  .submit {
    color: var(--color-blue);
    border: 1px solid var(--color-blue);
    background-color: var(--color-paleblue);
    :hover {
      background-color: var(--color-lightblue);
      &:disabled {
        background-color: var(--color-paleblue);
      }
    }
  }
  .submit {
    font-size: 1.25rem;
  }
`;

const BtnCell = ({ children }) => {
  return <CellContainer>{children}</CellContainer>;
};

BtnCell.propTypes = {
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]),
};

export default BtnCell;
