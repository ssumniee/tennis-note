import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TitleAreaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0 1.5rem;
  :first-child {
    margin-top: 0;
  }
  > * {
    margin: 0 0.5rem 0 0;
    :last-child {
      margin-right: 0;
    }
  }
`;

const TitleArea = ({ className, children }) => {
  return <TitleAreaContainer className={className}>{children}</TitleAreaContainer>;
};

TitleArea.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]),
};

export default TitleArea;
