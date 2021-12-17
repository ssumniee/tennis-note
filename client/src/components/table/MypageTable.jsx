import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Row from "./MypageRow";

const TableContainer = styled.table`
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid var(--color-gray);
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  :first-child {
    margin-top: 0;
  }
`;
const TableHead = styled.thead`
  font-size: 0.875rem;
  border-bottom: 1px solid var(--color-gray);
`;
const TableBody = styled.tbody`
  font-family: Interop-Regular;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
`;

const MypageTable = ({ subject, isAdding, infoList = [] }) => {
  return (
    <TableContainer>
      {!isAdding && (
        <TableHead>
          <Row subject={subject} isOnHead />
        </TableHead>
      )}
      <TableBody>
        {isAdding ? (
          <Row subject={subject} isOnAdd />
        ) : (
          infoList.map((info, idx) => (
            <Row key={idx} subject={subject} info={{ ...info, num: idx + 1 }}></Row>
          ))
        )}
      </TableBody>
    </TableContainer>
  );
};

MypageTable.defaultProps = {
  isAdding: false,
};

MypageTable.propTypes = {
  subject: PropTypes.string,
  isAdding: PropTypes.bool,
  infoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      club_id: PropTypes.number,
      court_id: PropTypes.number,
    })
  ),
};

export default MypageTable;
