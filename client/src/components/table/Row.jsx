import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import Cell from "./Cell";
import BtnCell from "./BtnCell";
import { FaPencilAlt } from "react-icons/fa";
import { HiX, HiCheck } from "react-icons/hi";
import tableApi from "../../api/table";
import { getAllUserInfoAction } from "../../store/actions";

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
`;

const heads = {
  num: "",
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
  const [userInfo, setUserInfo] = useState({ ...info });

  const handleUpdateInfo = async () => {
    try {
      // 바뀐 정보 userInfo로 DB 업데이트
      const res = await tableApi.modifyUserInfo(userInfo.club_id, userInfo);
      // 리덕스 스토어 업데이트
      dispatch(getAllUserInfoAction(res.data));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuitUpdate = () => {
    setUserInfo({ ...info });
    setIsEditing(false);
  };

  useEffect(() => {
    return () => {
      setIsEditing(false);
    };
  }, []);

  return (
    <RowContainer isOnHead={isOnHead}>
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
                userInfo={userInfo}
                setUserInfo={setUserInfo}
              >
                {userInfo[el]}
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
