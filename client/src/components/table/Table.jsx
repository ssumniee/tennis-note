import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";
import Row from "./Row";
import EmptyRow from "./EmptyRow";

const TableContainer = styled.table`
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid var(--color-gray);
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.isAdding &&
    css`
      margin-top: 2.25rem;
      ${media.lessThan("medium")`
          display: none;
        `}
    `}
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

const Table = ({ subject, isAdding, infoList = [] }) => {
  return (
    <TableContainer isAdding={isAdding}>
      {!isAdding && (
        <TableHead>
          <Row subject={subject} isOnHead />
        </TableHead>
      )}
      <TableBody>
        {isAdding ? (
          <Row subject={subject} isOnAdd />
        ) : infoList.length ? (
          infoList.map((info, idx) => (
            <Row key={idx} subject={subject} info={{ ...info, num: idx + 1 }}></Row>
          ))
        ) : (
          <EmptyRow subject={subject} />
        )}
      </TableBody>
    </TableContainer>
  );
};

Table.defaultProps = {
  isAdding: false,
};

Table.propTypes = {
  subject: PropTypes.string,
  isAdding: PropTypes.bool,
  infoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      username: PropTypes.string,
      clubname: PropTypes.string,
      club_id: PropTypes.number,
      court_id: PropTypes.number,
    })
  ),
};

export default Table;
