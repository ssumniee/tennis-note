import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Row from "./Row";

const TableContainer = styled.table`
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid var(--color-gray);
  display: flex;
  flex-direction: column;
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

const Table = ({ users }) => {
  useEffect(() => {
    console.log("user updated");
  }, []);
  return (
    <TableContainer>
      <TableHead>
        <Row isOnHead></Row>
      </TableHead>
      <TableBody>
        {users.map((info, idx) => (
          <Row key={idx} info={{ ...info, num: idx + 1 }}></Row>
        ))}
      </TableBody>
    </TableContainer>
  );
};

Table.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      name: PropTypes.string,
      club_id: PropTypes.number,
      teacher_id: PropTypes.number,
      tel: PropTypes.string,
      start_date: PropTypes.string,
      count: PropTypes.number,
      days: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
};

export default Table;
