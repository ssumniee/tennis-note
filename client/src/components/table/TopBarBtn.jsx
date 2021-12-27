import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Button = styled.button`
  border-radius: 0.25rem;
  font-size: 0.75rem;
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
  &.export {
    color: var(--color-white);
    background-color: var(--color-blue);
  }
`;

const TopBarBtn = ({ className, children, onClick }) => {
  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  );
};

TopBarBtn.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]),
  onClick: PropTypes.func,
};

export default TopBarBtn;
