import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";

const Button = styled.button`
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  .icon {
    font-size: 1rem;
    margin: 0 0.5rem;
    :first-child {
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
  }
  :hover {
    opacity: 0.8;
  }
  ${(props) =>
    props.fontSize
      ? css`
          font-size: ${props.fontSize}rem;
        `
      : css`
          font-size: 0.875rem;
        `}
  ${media.lessThan("medium")`
    display: none;
  `}
  &.export {
    color: var(--color-white);
    background-color: var(--color-blue);
  }
`;

const TopBarBtn = ({ className, children, onClick, fontSize }) => {
  return (
    <Button className={className} onClick={onClick} fontSize={fontSize}>
      {children}
    </Button>
  );
};

TopBarBtn.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]),
  onClick: PropTypes.func,
  fontSize: PropTypes.string,
};

export default TopBarBtn;
