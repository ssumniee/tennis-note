import React, { useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";
import Cell from "./Cell";
import { FaPencilAlt } from "react-icons/fa";
import { HiX, HiCheck } from "react-icons/hi";

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
`;

const ContentContainer = styled.div`
  flex: 1 1 0;
  display: flex;
`;

const ButtonContainer = styled.div`
  flex: 0 0 1;
  width: 5rem;
  height: 100%;
  display: flex;
  ${media.lessThan("small")`
    display: none;
  `}
`;

const Button = styled.button`
  &.clear {
    color: var(--color-red);
    border: 1px solid var(--color-red);
    background-color: var(--color-palered);
    :hover {
      background-color: var(--color-lightred);
    }
  }
  &.apply {
    color: var(--color-green);
    border: 1px solid var(--color-green);
    background-color: var(--color-palegreen);
    :hover {
      background-color: var(--color-lightgreen);
    }
  }
  &.edit {
    color: var(--color-blue);
    border: 1px solid var(--color-blue);
    background-color: var(--color-paleblue);
    :hover {
      background-color: var(--color-lightblue);
    }
  }
  font-size: 0.875rem;
  border-radius: 0.25rem;
  padding: 0.125rem;
  margin-right: 0.25rem;
  :last-child {
    margin: 0;
  }
  flex: 1 1 0;
  height: 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Row = ({ isOnHead, children }) => {
  const [isEditable, setIsEditable] = useState(false);
  return (
    <RowContainer isOnHead={isOnHead}>
      <ContentContainer>{children}</ContentContainer>
      <ButtonContainer>
        <Cell content="edit">
          {!isOnHead &&
            (isEditable ? (
              <>
                <Button
                  className="apply btn"
                  onClick={() => {
                    setIsEditable(false);
                  }}
                >
                  <HiCheck />
                </Button>
                <Button
                  className="clear btn"
                  onClick={() => {
                    setIsEditable(false);
                  }}
                >
                  <HiX />
                </Button>
              </>
            ) : (
              <Button
                className="edit btn"
                onClick={() => {
                  setIsEditable(true);
                }}
              >
                <FaPencilAlt />
              </Button>
            ))}
        </Cell>
      </ButtonContainer>
    </RowContainer>
  );
};

Row.defalutProps = {
  isOnHead: false,
};

Row.propTypes = {
  isOnHead: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]).isRequired,
};

export default Row;
