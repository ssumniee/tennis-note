import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";
import TextInput from "../input/TextInput";
import PasswordInput from "../input/PasswordInput";

const CellContainer = styled.th`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 2.5rem;
  padding: 0.25rem;
  border-right: 1px solid var(--color-lightgray);
  :last-child {
    border: none;
  }
  flex: 1 1 0;
  position: relative;
  .content {
    display: flex;
  }
  .clear-input {
    ${media.lessThan("medium")`
      display: none;
    `}
  }
`;

const Content = styled.div`
  text-align: left;
  flex: 1 1 0;
  overflow-wrap: break-word;
  font-family: Interop-Medium;
  padding: 0 0.5rem;
  ${media.lessThan("medium")`
    padding: 0 0.25rem;
  `}
`;

const AdminCell = ({ content, isOnHead, isEditing, clubInfo, setClubInfo, children }) => {
  return (
    <CellContainer content={content} isOnHead={isOnHead}>
      {isOnHead ? (
        <Content className="content">{children}</Content>
      ) : !isEditing || content === "createdAt" ? (
        <Content className="content">
          {content === "createdAt"
            ? `${clubInfo[content].split("T")[0]} ${clubInfo[content].split("T")[1].split(".")[0]}`
            : clubInfo[content]}
        </Content>
      ) : (
        <>
          {content === "name" && (
            <TextInput content={content} inputValue={clubInfo.name} setInputValue={setClubInfo} />
          )}
          {content === "password" && (clubInfo.is_admin || clubInfo.temp) && (
            <PasswordInput
              content={content}
              inputValue={clubInfo.password}
              setInputValue={setClubInfo}
              isAdmin={clubInfo.is_admin}
            />
          )}
        </>
      )}
    </CellContainer>
  );
};

AdminCell.defalutProps = {
  isOnHead: false,
};

AdminCell.propTypes = {
  content: PropTypes.string.isRequired,
  isOnHead: PropTypes.bool,
  isEditing: PropTypes.bool,
  clubInfo: PropTypes.shape({
    id: PropTypes.number,
    is_admin: PropTypes.bool,
    temp: PropTypes.bool,
    num: PropTypes.number,
    name: PropTypes.string,
    password: PropTypes.string,
    createdAt: PropTypes.date,
  }),
  setClubInfo: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]),
};

export default AdminCell;
