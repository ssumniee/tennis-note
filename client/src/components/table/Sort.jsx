import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getAllStudentInfoAction } from "../../store/actions";
import SelectInput from "../input/SelectInput";
import CheckboxInput from "../input/CheckboxInput";

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  height: 1.75rem;
  .input {
    width: max-content;
    min-width: max-content;
  }
  .checkbox {
    margin-left: 0.5rem;
  }
`;

const lists = {
  student: [
    { id: "id", name: "기본" },
    { id: "name", name: "이름" },
    { id: "count", name: "등록 횟수" },
  ],
};

const Sort = ({ subject, originList }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("id");
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
      <SelectInput
        className="input"
        list={lists[subject]}
        inputValue={selected}
        setInputValue={setSelected}
        unclearable
      />
      {selected !== "id" && (
        <CheckboxInput
          className="checkbox"
          inputValue={isDesc}
          setInputValue={setIsDesc}
          description="내림차순"
        />
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
