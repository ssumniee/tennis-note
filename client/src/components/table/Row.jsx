import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import Cell from "./Cell";
import BtnCell from "./BtnCell";
import NumCell from "./NumCell";
import { FaPencilAlt } from "react-icons/fa";
import { HiX, HiCheck, HiMinus } from "react-icons/hi";
import studentApi from "../../api/student";
import { getAllStudentInfoAction } from "../../store/actions";

const RowContainer = styled.tr`
  ${(props) =>
    !props.isOnHead &&
    css`
      border-bottom: 1px solid var(--color-lightgray);
      :last-child {
        border: none;
      }
    `}
  display: flex;
  justify-content: space-between;
  .button {
    font-size: 0.875rem;
    border-radius: 0.25rem;
    padding: 0.125rem;
    margin: 0 0.125rem;
    flex: 1 1 0;
    height: 1.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    :disabled {
      opacity: 0.4;
    }
  }
  .delete {
    color: var(--color-red);
    border: 1px solid var(--color-red);
    background-color: var(--color-palered);
    :hover {
      background-color: var(--color-lightred);
      &:disabled {
        background-color: var(--color-palered);
      }
    }
  }
`;

const heads = {
  name: "이름",
  tel: "전화번호",
  start_date: "시작일",
  teacher_id: "선생님",
  days: "요일",
  count: "횟수",
};

const Row = ({ isOnHead, info }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [studentInfo, setStudentInfo] = useState({ ...info });

  const handleUpdateInfo = async () => {
    try {
      // 바뀐 정보 studentInfo로 DB 업데이트
      const res = await studentApi.modifyStudentInfo(studentInfo.club_id, studentInfo);
      // 리덕스 스토어 업데이트
      dispatch(getAllStudentInfoAction(res.data));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuitUpdate = () => {
    setStudentInfo({ ...info });
    setIsEditing(false);
  };

  const handleDeleteInfo = async () => {
    try {
      // studentInfo 삭제하도록 DB 업데이트
      const res = await studentApi.deleteStudentInfo(studentInfo.club_id, studentInfo.id);
      // 리덕스 스토어 업데이트
      dispatch(getAllStudentInfoAction(res.data));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    return () => {
      setIsEditing(false);
    };
  }, []);

  return (
    <RowContainer isOnHead={isOnHead}>
      <NumCell>
        {isOnHead ? (
          ""
        ) : isEditing ? (
          <button className="delete button" onClick={handleDeleteInfo}>
            <HiMinus />
          </button>
        ) : (
          info.num
        )}
      </NumCell>
      <>
        {isOnHead
          ? Object.keys(heads).map((el, idx) => (
              <Cell key={idx} content={el} isOnHead>
                {heads[el]}
              </Cell>
            ))
          : Object.keys(heads).map((el, idx) => (
              <Cell
                key={idx}
                content={el}
                isEditing={isEditing}
                studentInfo={studentInfo}
                setStudentInfo={setStudentInfo}
              >
                {studentInfo[el]}
              </Cell>
            ))}
      </>
      <BtnCell>
        {!isOnHead &&
          (isEditing ? (
            <>
              <button className="apply button" onClick={handleUpdateInfo}>
                <HiCheck />
              </button>
              <button className="clear button" onClick={handleQuitUpdate}>
                <HiX />
              </button>
            </>
          ) : (
            <button
              className="edit button"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <FaPencilAlt />
            </button>
          ))}
      </BtnCell>
    </RowContainer>
  );
};

Row.defalutProps = {
  isOnHead: false,
};

Row.propTypes = {
  isOnHead: PropTypes.bool,
  info: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    club_id: PropTypes.number,
    teacher_id: PropTypes.number,
    tel: PropTypes.string,
    start_date: PropTypes.string,
    count: PropTypes.number,
    days: PropTypes.arrayOf(PropTypes.number),
    num: PropTypes.number,
  }),
};

export default Row;
