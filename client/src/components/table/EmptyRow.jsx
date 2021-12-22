import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HiEmojiSad } from "react-icons/hi";

const RowContainer = styled.tr`
  width: 100%;
  height: 100%;
  min-height: 3.25rem;
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const EmptyCell = styled.th`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  color: var(--color-gray);
  .icon {
    font-size: 1.125rem;
    margin: 0 0.125rem;
    :first-child {
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
  }
`;

const EmptyRow = ({ subject }) => {
  return (
    <RowContainer>
      <EmptyCell>
        <p>
          {(subject === "student" && "회원" + " ") ||
            (subject === "club" && "클럽" + " ") ||
            (subject === "teacher" && "강사" + " ") ||
            (subject === "court" && "코트" + " ")}
          정보가 없습니다
        </p>
        <HiEmojiSad className="icon" />
      </EmptyCell>
    </RowContainer>
  );
};

EmptyRow.propTypes = {
  subject: PropTypes.string,
};

export default EmptyRow;
