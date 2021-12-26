import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { BsCloudArrowUp, BsCloudArrowDown } from "react-icons/bs";
import utilApi from "../../api/util";

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

const ImportExportBtn = ({ isImport }) => {
  return (
    <>
      {isImport ? (
        <ImportButton id="import-btn" onClick={utilApi.importTableData}>
          <p>업로드</p>
          <BsCloudArrowUp className="icon" />
        </ImportButton>
      ) : (
        <ExportButton id="export-btn" onClick={utilApi.exportTableData}>
          <p>다운로드</p>
          <BsCloudArrowDown className="icon" />
        </ExportButton>
      )}
    </>
  );
};

ImportExportBtn.defaultProps = {
  isImport: false,
};

ImportExportBtn.propTypes = {
  isImport: PropTypes.bool,
};

export default ImportExportBtn;
