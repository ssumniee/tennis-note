import React from "react";
import styled from "styled-components";
import media from "styled-media-query";
import ImportExportBtn from "./ImportExportBtn";

const TopBarContainer = styled.div`
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

const TableTopBar = () => {
  return (
    <TopBarContainer>
      <ImportExportBtn isImport />
      <ImportExportBtn />
    </TopBarContainer>
  );
};

export default TableTopBar;
