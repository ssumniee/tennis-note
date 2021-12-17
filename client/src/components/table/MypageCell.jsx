import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";
import TextInput from "../input/TextInput";
import SelectInput from "../input/SelectInput";

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

const Label = styled.label`
  font-size: 0.75rem;
  top: -0.5rem;
  transform: translateY(-100%);
  position: absolute;
  padding: 0 0.25rem;
  display: flex;
  .required {
    margin: 0 0.125rem;
    color: var(--color-blue);
  }
`;

const MypageCell = ({
  content,
  isOnHead,
  isOnAdd,
  isEditing,
  tableInfo,
  setTableInfo,
  label,
  children,
}) => {
  const { courts: courtList } = useSelector(({ authReducer }) => authReducer);
  return (
    <CellContainer content={content} isOnHead={isOnHead}>
      {isOnAdd && (
        <Label>
          {label}
          {content === "name" && <div className="required">*</div>}
        </Label>
      )}
      {isOnHead ? (
        <Content className="content">{children}</Content>
      ) : !isEditing && !isOnAdd ? (
        <Content className="content">
          {content === "court_id"
            ? courtList.find((court) => court.id === tableInfo.court_id)?.name
            : tableInfo[content]}
        </Content>
      ) : (
        <>
          {content === "name" && (
            <TextInput content={content} inputValue={tableInfo.name} setInputValue={setTableInfo} />
          )}
          {content === "court_id" && (
            <SelectInput
              content={content}
              inputValue={tableInfo.court_id}
              setInputValue={setTableInfo}
              list={courtList}
            />
          )}
        </>
      )}
    </CellContainer>
  );
};

MypageCell.defalutProps = {
  isOnHead: false,
  isOnAdd: false,
};

MypageCell.propTypes = {
  content: PropTypes.string.isRequired,
  isOnHead: PropTypes.bool,
  isOnAdd: PropTypes.bool,
  isEditing: PropTypes.bool,
  tableInfo: PropTypes.shape({
    id: PropTypes.number,
    num: PropTypes.number,
    name: PropTypes.string,
    club_id: PropTypes.number,
    court_id: PropTypes.number,
  }),
  setTableInfo: PropTypes.func,
  label: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]),
};

export default MypageCell;
