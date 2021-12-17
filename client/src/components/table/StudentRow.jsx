import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";
import Cell from "./StudentCell";
import { FaPencilAlt } from "react-icons/fa";
import { HiX, HiCheck, HiMinus, HiPlusSm } from "react-icons/hi";
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
  .quit {
    color: var(--color-gray);
    border: 1px solid var(--color-gray);
    background-color: var(--color-palegray);
    :hover {
      background-color: var(--color-lightgray);
      &:disabled {
        background-color: var(--color-palegray);
      }
    }
  }
  .apply {
    color: var(--color-green);
    border: 1px solid var(--color-green);
    background-color: var(--color-palegreen);
    :hover {
      background-color: var(--color-lightgreen);
      &:disabled {
        background-color: var(--color-palegreen);
      }
    }
  }
  .edit,
  .submit {
    color: var(--color-blue);
    border: 1px solid var(--color-blue);
    background-color: var(--color-paleblue);
    :hover {
      background-color: var(--color-lightblue);
      &:disabled {
        background-color: var(--color-paleblue);
      }
    }
  }
  .submit {
    font-size: 1.25rem;
  }
`;

const FixedCell = styled.th`
  min-height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.25rem;
  ${media.lessThan("medium")`
    display: none;
  `}
`;

const NumCell = styled(FixedCell)`
  flex: 0 0 2.5rem;
  border-right: 1px solid var(--color-lightgray);
`;

const BtnCell = styled(FixedCell)`
  flex: 0 0 4.5rem;
`;

const heads = {
  name: "이름",
  tel: "전화번호",
  start_date: "시작일",
  teacher_id: "선생님",
  days: "요일",
  count: "등록 횟수",
};

const StudentRow = ({ isOnHead, isOnAdd, info }) => {
  const dispatch = useDispatch();
  const { id: clubId } = useSelector(({ authReducer }) => authReducer);
  const [isEditing, setIsEditing] = useState(false);
  const [studentInfo, setStudentInfo] = useState(
    isOnHead
      ? {}
      : isOnAdd
      ? { name: "", tel: "", start_date: null, teacher_id: "", days: [], count: 0 }
      : { ...info }
  );

  const handleUpdateInfo = async () => {
    try {
      // 바뀐 정보 studentInfo로 DB 업데이트
      await studentApi.modifyStudentInfo(studentInfo);
      // 리덕스 스토어 업데이트
      const res = await studentApi.getAllStudentInfo();
      if (res.status === 200) {
        dispatch(getAllStudentInfoAction(res.data));
      }
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
      await studentApi.deleteStudentInfo(studentInfo.id);
      // 리덕스 스토어 업데이트
      const res = await studentApi.getAllStudentInfo();
      if (res.status === 200) {
        dispatch(getAllStudentInfoAction(res.data));
      }
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateInfo = async () => {
    try {
      const { name, tel, start_date: start, teacher_id: teacher, days, count } = studentInfo;
      const toAdd = {
        student: {
          club_id: clubId,
          name,
          tel: tel || null,
          start_date: start,
          teacher_id: teacher || null,
          count: count || 0,
        },
        days,
      };
      // 새로운 정보를 studentInfo로 DB에 추가
      await studentApi.addStudentInfo(toAdd);
      // 리덕스 스토어 업데이트
      const res = await studentApi.getAllStudentInfo();
      if (res.status === 200) {
        dispatch(getAllStudentInfoAction(res.data));
      }
      // 유저 정보 state 초기화
      setStudentInfo({
        name: "",
        tel: "",
        start_date: null,
        teacher_id: "",
        days: [],
        count: 0,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    return () => {
      setIsEditing(false);
    };
  }, []);

  useEffect(() => {
    setStudentInfo(
      isOnHead
        ? {}
        : isOnAdd
        ? { name: "", tel: "", start_date: null, teacher_id: "", days: [], count: 0 }
        : { ...info }
    );
  }, [info]);

  return (
    <RowContainer isOnHead={isOnHead}>
      <NumCell>
        {isOnHead ? (
          ""
        ) : isOnAdd ? (
          <HiPlusSm className="plus text" />
        ) : isEditing ? (
          <button className="delete button" onClick={handleDeleteInfo}>
            <HiMinus />
          </button>
        ) : (
          info.num
        )}
      </NumCell>
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
              isEditing={!isOnAdd && isEditing}
              studentInfo={studentInfo}
              setStudentInfo={setStudentInfo}
              label={heads[el]}
              isOnAdd={isOnAdd}
            />
          ))}
      <BtnCell>
        {!isOnHead &&
          (isOnAdd ? (
            <button
              className="submit button"
              onClick={handleCreateInfo}
              disabled={!studentInfo.name}
            >
              <HiPlusSm />
            </button>
          ) : isEditing ? (
            <>
              <button className="apply button" onClick={handleUpdateInfo}>
                <HiCheck />
              </button>
              <button className="quit button" onClick={handleQuitUpdate}>
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

StudentRow.defalutProps = {
  isOnHead: false,
  isOnAdd: false,
};

StudentRow.propTypes = {
  isOnHead: PropTypes.bool,
  isOnAdd: PropTypes.bool,
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

export default StudentRow;
