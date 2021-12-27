import React from "react";
import styled from "styled-components";
import media from "styled-media-query";
import PropTypes from "prop-types";

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  :first-child {
    margin-top: 0;
  }
  :last-child {
    margin-bottom: 0;
  }
  > * {
    margin: 0 0.25rem;
    :first-child {
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
  }
  ${media.lessThan("medium")`
    display: none;
  `}
`;

const TopBar = ({ children }) => {
  return <TopBarContainer>{children}</TopBarContainer>;
};

TopBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]),
};

export default TopBar;
