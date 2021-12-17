import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Row from "./AdminRow";

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

const AdminTable = ({ infoList = [] }) => {
  return (
    <TableContainer>
      <TableHead>
        <Row isOnHead />
      </TableHead>
      <TableBody>
        {infoList.map((info, idx) => (
          <Row key={idx} info={{ ...info, num: idx + 1 }}></Row>
        ))}
      </TableBody>
    </TableContainer>
  );
};

AdminTable.propTypes = {
  infoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      password: PropTypes.string,
      createdAt: PropTypes.date,
    })
  ),
};

export default AdminTable;
