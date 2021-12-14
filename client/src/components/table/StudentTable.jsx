import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Row from "./StudentRow";

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

const StudentTable = ({ isAdding, infoList = [] }) => {
  return (
    <TableContainer>
      {!isAdding && (
        <TableHead>
          <Row isOnHead />
        </TableHead>
      )}
      <TableBody>
        {isAdding ? (
          <Row isOnAdd />
        ) : (
          infoList.map((info, idx) => <Row key={idx} info={{ ...info, num: idx + 1 }}></Row>)
        )}
      </TableBody>
    </TableContainer>
  );
};

StudentTable.defalutProps = {
  isAdding: false,
};

StudentTable.propTypes = {
  isAdding: PropTypes.bool,
  infoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      club_id: PropTypes.number,
      teacher_id: PropTypes.number,
      tel: PropTypes.string,
      start_date: PropTypes.string,
      count: PropTypes.number,
      days: PropTypes.arrayOf(PropTypes.number),
    })
  ),
};

export default StudentTable;
