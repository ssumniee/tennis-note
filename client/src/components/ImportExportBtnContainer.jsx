import React from "react";
import styled from "styled-components";
import media from "styled-media-query";
import PropTypes from "prop-types";
import { BsCloudArrowUp, BsCloudArrowDown } from "react-icons/bs";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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

const Button = styled.button`
  border-radius: 0.25rem;
  font-size: 0.75rem;
  padding: 0 0.5rem;
  height: 1.75rem;
  align-self: flex-end;
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
`;

const ExportButton = styled(Button)`
  color: var(--color-white);
  background-color: var(--color-blue);
`;

const ImportButton = styled(Button)`
  color: var(--color-blue);
  background-color: var(--color-lightblue);
`;

const ExportBtn = ({ className, subject }) => {
  const importData = () => {};

  const exportData = () => {};

  return (
    <ButtonContainer className={className}>
      <ImportButton id="import-btn" onClick={importData}>
        <p>업로드</p>
        <BsCloudArrowUp className="icon" />
      </ImportButton>
      <ExportButton id="export-btn" onClick={exportData}>
        <p>다운로드</p>
        <BsCloudArrowDown className="icon" />
      </ExportButton>
    </ButtonContainer>
  );
};

ExportBtn.propTypes = {
  className: PropTypes.string,
  subject: PropTypes.string,
};

export default ExportBtn;
