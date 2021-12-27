import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getAllStudentInfoAction } from "../../store/actions";

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin-right: 0.5rem;
    :last-child {
      margin-right: 0;
    }
  }
  * {
    align-items: center;
    display: flex;
  }
`;

const Sort = ({ subject, originList }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({ id: true, name: false, count: false, court: false });
  const [isDesc, setIsDesc] = useState(false);

  useEffect(() => {
    switch (subject) {
      case "student":
        dispatch(
          getAllStudentInfoAction({
            students: originList.sort((a, b) => {
              const valA = selected === "name" ? a[selected].toUpperCase() : a[selected];
              const valB = selected === "name" ? b[selected].toUpperCase() : b[selected];
              if (valA < valB) return isDesc ? 1 : -1;
              else if (valA > valB) return isDesc ? -1 : 1;
              else return 0;
            }),
          })
        );
        break;
      default:
        break;
    }
  }, [selected, isDesc, originList]);

  return (
    <SortContainer>
      <select onChange={(event) => setSelected(event.target.value)} value={selected}>
        <option value="id">기본순</option>
        <option value="name">이름순</option>
        {subject === "student" && <option value="count">횟수순</option>}
      </select>
      {selected !== "id" && (
        <div>
          <input
            type="checkbox"
            checked={isDesc}
            onChange={(event) => setIsDesc(event.target.checked)}
          />
          <p>내림차순</p>
        </div>
      )}
    </SortContainer>
  );
};

Sort.propTypes = {
  subject: PropTypes.string,
  originList: PropTypes.arrayOf(
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

export default Sort;
