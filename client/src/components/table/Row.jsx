import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";
import StudentCell from "./StudentCell";
import ClubCell from "./ClubCell";
import TeacherCell from "./TeacherCell";
import CourtCell from "./CourtCell";
import { FaPencilAlt } from "react-icons/fa";
import { HiX, HiCheck, HiMinus, HiPlusSm } from "react-icons/hi";
import authApi from "../../api/auth";
import studentApi from "../../api/student";
import clubApi from "../../api/club";
import { loginAction, getAllStudentInfoAction, getAllClubInfoAction } from "../../store/actions";

const RowContainer = styled.tr`
  ${(props) =>
    props.isOnHead
      ? css`
          font-size: 0.75rem;
          > th {
            min-height: 2rem;
          }
        `
      : css`
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
`;

const NumCell = styled(FixedCell)`
  flex: 0 0 2.5rem;
  border-right: 1px solid var(--color-lightgray);
`;

const BtnCell = styled(FixedCell)`
  flex: 0 0 4.5rem;
  ${media.lessThan("medium")`
    display: none;
  `}
`;

const heads = {
  student: {
    name: "이름",
    tel: "전화번호",
    start_date: "시작일",
    teacher_id: "선생님",
    days: "요일",
    count: "등록 횟수",
  },
  club: { clubname: "클럽명", username: "아이디", password: "비밀번호", createdAt: "가입일" },
  teacher: { name: "이름", court_id: "코트" },
  court: { name: "이름" },
};

const MypageRow = ({ subject, isOnHead, isOnAdd, info }) => {
  const dispatch = useDispatch();
  const { id: clubId } = useSelector(({ authReducer }) => authReducer);
  const [isEditing, setIsEditing] = useState(false);
  const [tableInfo, setTableInfo] = useState({});

  const handleUpdateInfo = async () => {
    try {
      // tableInfo 정보 DB 업데이트
      switch (subject) {
        case "student":
          await studentApi.modifyStudentInfo({
            ...tableInfo,
            clubname: tableInfo.clubname || null,
            tel: tableInfo.tel || null,
            teacher_id: tableInfo.teacher_id || null,
          });
          break;
        case "club":
          await clubApi.modifyClubInfo(tableInfo);
          break;
        case "teacher":
          await clubApi.modifyTeacherInfo({ ...tableInfo, court_id: tableInfo.court_id || null });
          break;
        case "court":
          await clubApi.modifyCourtInfo(tableInfo);
          break;
        default:
      }
      // 리덕스 스토어 업데이트
      if (subject === "student") {
        const res = await studentApi.getAllStudentInfo();
        if (res.status === 200) {
          dispatch(getAllStudentInfoAction(res.data));
        }
      } else if (subject === "club") {
        const res = await clubApi.getAllClubInfo();
        if (res.status === 200) {
          dispatch(getAllClubInfoAction(res.data));
        }
      } else {
        const res = await authApi.me();
        if (res.status === 200) {
          dispatch(loginAction(res.data));
        }
      }
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuitUpdate = () => {
    switch (subject) {
      case "student":
        setTableInfo(
          isOnAdd
            ? { name: "", tel: "", start_date: null, teacher_id: "", days: [], count: 0 }
            : { ...info }
        );
        break;
      case "club":
        setTableInfo({ ...info });
        break;
      case "teacher":
        setTableInfo(isOnAdd ? { name: "", court_id: "" } : { ...info });
        break;
      case "court":
        setTableInfo(isOnAdd ? { name: "" } : { ...info });
        break;
      default:
    }
    setIsEditing(false);
  };

  const handleDeleteInfo = async () => {
    try {
      // tableInfo 삭제하도록 DB 업데이트
      switch (subject) {
        case "student":
          await studentApi.deleteStudentInfo(tableInfo.id);
          break;
        case "club":
          await clubApi.deleteClubInfo(tableInfo.id);
          break;
        case "teacher":
          await clubApi.deleteTeacherInfo(tableInfo.id);
          break;
        case "court":
          await clubApi.deleteCourtInfo(tableInfo.id);
          break;
        default:
      }
      // 리덕스 스토어 업데이트
      if (subject === "student") {
        const res = await studentApi.getAllStudentInfo();
        if (res.status === 200) {
          dispatch(getAllStudentInfoAction(res.data));
        }
      } else if (subject === "club") {
        const res = await clubApi.getAllClubInfo();
        if (res.status === 200) {
          dispatch(getAllClubInfoAction(res.data));
        }
      } else {
        const res = await authApi.me();
        if (res.status === 200) {
          dispatch(loginAction(res.data));
        }
      }
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateInfo = async () => {
    try {
      const {
        name,
        tel,
        start_date: start,
        teacher_id: teacher,
        days,
        count,
        court_id: court,
      } = tableInfo;
      // tableInfo 정보 DB에 추가
      switch (subject) {
        case "student":
          await studentApi.addStudentInfo({
            student: {
              club_id: clubId,
              name,
              tel: tel || null,
              start_date: start,
              teacher_id: teacher || null,
              count: count || 0,
            },
            days,
          });
          break;
        case "teacher":
          await clubApi.addTeacherInfo({ name, club_id: clubId, court_id: court || null });
          break;
        case "court":
          await clubApi.addCourtInfo({ name, club_id: clubId });
          break;
        default:
      }
      // 리덕스 스토어 업데이트
      if (subject === "student") {
        const res = await studentApi.getAllStudentInfo();
        if (res.status === 200) {
          dispatch(getAllStudentInfoAction(res.data));
        }
      } else {
        const res = await authApi.me();
        if (res.status === 200) {
          dispatch(loginAction(res.data));
        }
      }
      // tableInfo 초기화
      switch (subject) {
        case "student":
          setTableInfo({ name: "", tel: "", start_date: null, teacher_id: "", days: [], count: 0 });
          break;
        case "teacher":
          setTableInfo({ name: "", court_id: "" });
          break;
        case "court":
          setTableInfo({ name: "" });
          break;
        default:
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isOnHead) return;
    switch (subject) {
      case "student":
        setTableInfo(
          isOnAdd
            ? { name: "", tel: "", start_date: null, teacher_id: "", days: [], count: 0 }
            : { ...info }
        );
        break;
      case "club":
        setTableInfo({ ...info });
        break;
      case "teacher":
        setTableInfo(isOnAdd ? { name: "", court_id: "" } : { ...info });
        break;
      case "court":
        setTableInfo(isOnAdd ? { name: "" } : { ...info });
        break;
      default:
    }
    return () => {
      setIsEditing(false);
    };
  }, []);

  useEffect(() => {
    if (isOnHead) return;
    switch (subject) {
      case "student":
        setTableInfo(
          isOnAdd
            ? { name: "", tel: "", start_date: null, teacher_id: "", days: [], count: 0 }
            : { ...info }
        );
        break;
      case "club":
        setTableInfo({ ...info });
        break;
      case "teacher":
        setTableInfo(isOnAdd ? { name: "", court_id: "" } : { ...info });
        break;
      case "court":
        setTableInfo(isOnAdd ? { name: "" } : { ...info });
        break;
      default:
    }
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
        ? Object.keys(heads[subject]).map((el, idx) => {
            switch (subject) {
              case "student":
                return (
                  <StudentCell key={idx} content={el} isOnHead>
                    {heads[subject][el]}
                  </StudentCell>
                );
              case "club":
                return (
                  <ClubCell key={idx} content={el} isOnHead>
                    {heads[subject][el]}
                  </ClubCell>
                );
              case "teacher":
                return (
                  <TeacherCell key={idx} content={el} isOnHead>
                    {heads[subject][el]}
                  </TeacherCell>
                );
              case "court":
                return (
                  <CourtCell key={idx} content={el} isOnHead>
                    {heads[subject][el]}
                  </CourtCell>
                );
              default:
                return <></>;
            }
          })
        : Object.keys(heads[subject]).map((el, idx) => {
            switch (subject) {
              case "student":
                return (
                  <StudentCell
                    key={idx}
                    content={el}
                    isEditing={isEditing}
                    tableInfo={tableInfo}
                    setTableInfo={setTableInfo}
                    label={heads[subject][el]}
                    isOnAdd={isOnAdd}
                  />
                );
              case "club":
                return (
                  <ClubCell
                    key={idx}
                    content={el}
                    isEditing={isEditing}
                    tableInfo={tableInfo}
                    setTableInfo={setTableInfo}
                    label={heads[subject][el]}
                    isOnAdd={isOnAdd}
                  />
                );
              case "teacher":
                return (
                  <TeacherCell
                    key={idx}
                    content={el}
                    isEditing={isEditing}
                    tableInfo={tableInfo}
                    setTableInfo={setTableInfo}
                    label={heads[subject][el]}
                    isOnAdd={isOnAdd}
                  />
                );
              case "court":
                return (
                  <CourtCell
                    key={idx}
                    content={el}
                    isEditing={isEditing}
                    tableInfo={tableInfo}
                    setTableInfo={setTableInfo}
                    label={heads[subject][el]}
                    isOnAdd={isOnAdd}
                  />
                );
              default:
                return <></>;
            }
          })}
      <BtnCell>
        {!isOnHead &&
          (isOnAdd ? (
            <button className="submit button" onClick={handleCreateInfo} disabled={!tableInfo.name}>
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

MypageRow.defalutProps = {
  isOnHead: false,
  isOnAdd: false,
};

MypageRow.propTypes = {
  subject: PropTypes.string,
  isOnHead: PropTypes.bool,
  isOnAdd: PropTypes.bool,
  info: PropTypes.shape({
    id: PropTypes.number,
    num: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    clubname: PropTypes.string,
    club_id: PropTypes.number,
    teacher_id: PropTypes.number,
    tel: PropTypes.string,
    start_date: PropTypes.string,
    count: PropTypes.number,
    days: PropTypes.arrayOf(PropTypes.number),
    password: PropTypes.string,
    createdAt: PropTypes.date,
    court_id: PropTypes.number,
  }),
};

export default MypageRow;
