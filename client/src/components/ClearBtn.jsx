import React from "react";
import styled from "styled-components";
import { IoCloseCircle } from "react-icons/io5";

// const ButtonContainer = styled.button`
//   font-size: 1.15em;
//   position: relative;
//   color: var(--color-lightgray);
//   :hover {
//     color: var(--color-gray);
//   }
//   > svg {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//   }
// `;

const Button = styled.button`
  font-size: 1.15em;
  position: relative;
  color: var(--color-lightgray);
  :hover {
    color: var(--color-gray);
  }
  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ClearBtn = () => {
  return (
    <Button>
      <IoCloseCircle />
    </Button>
  );
};

export default ClearBtn;
