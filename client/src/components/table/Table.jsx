import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Cell from "./Cell";
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

const heads = {
  num: "",
  name: "이름",
  tel: "전화번호",
  start: "시작일",
  teacher: "선생님",
  days: "요일",
  count: "횟수",
};

const Table = ({ users }) => {
  const [bodies, setBodies] = useState([]);
  useEffect(() => {
    setBodies(
      users.map((info, idx) => {
        return {
          num: idx + 1,
          name: info.name,
          tel: info.tel || "-",
          start: info.start_date ? info.start_date.split("-").join(". ") : "-",
          teacher: info.teacher_name || "-",
          days: info.days.join(", "),
          count: info.count || 0,
        };
      })
    );
  }, [users]);

  return (
    <TableContainer>
      <TableHead>
        <Row isOnHead>
          {Object.keys(heads).map((el, idx) => (
            <Cell key={idx} content={el} isOnHead>
              {heads[el]}
            </Cell>
          ))}
        </Row>
      </TableHead>
      <TableBody>
        {bodies.map((info, idx) => (
          <Row key={idx}>
            {Object.keys(heads).map((el, idx) => (
              <Cell key={idx} content={el}>
                {info[el]}
              </Cell>
            ))}
          </Row>
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
      tel: PropTypes.string,
      start_date: PropTypes.string,
      count: PropTypes.number,
      teacher_name: PropTypes.string,
      days: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default Table;
