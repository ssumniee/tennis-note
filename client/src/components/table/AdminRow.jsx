import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "styled-media-query";
import Cell from "./AdminCell";
import { FaPencilAlt } from "react-icons/fa";
import { HiX, HiCheck, HiMinus } from "react-icons/hi";
import clubApi from "../../api/club";
import { getAllClubInfoAction } from "../../store/actions";

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
  .edit {
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
  password: "비밀번호",
  createdAt: "가입일",
};

const AdminRow = ({ isOnHead, info }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [clubInfo, setClubInfo] = useState({ ...info });

  const handleUpdateInfo = async () => {
    try {
      // 바뀐 정보 clubInfo로 DB 업데이트
      await clubApi.modifyClubInfo(clubInfo);
      // 리덕스 스토어 업데이트
      const res = await clubApi.getAllClubInfo();
      if (res.status === 200) {
        dispatch(getAllClubInfoAction(res.data));
      }
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuitUpdate = () => {
    setClubInfo({ ...info });
    setIsEditing(false);
  };

  const handleDeleteInfo = async () => {
    try {
      // clubInfo 삭제하도록 DB 업데이트
      await clubApi.deleteClubInfo(clubInfo.id);
      // 리덕스 스토어 업데이트
      const res = await clubApi.getAllClubInfo();
      if (res.status === 200) {
        dispatch(getAllClubInfoAction(res.data));
      }
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

  useEffect(() => {
    setClubInfo({ ...info });
  }, [info]);

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
              clubInfo={clubInfo}
              setClubInfo={setClubInfo}
              label={heads[el]}
            />
          ))}
      <BtnCell>
        {!isOnHead &&
          (isEditing ? (
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

AdminRow.defalutProps = {
  isOnHead: false,
};

AdminRow.propTypes = {
  isOnHead: PropTypes.bool,
  info: PropTypes.shape({
    id: PropTypes.number,
    num: PropTypes.number,
    name: PropTypes.string,
    password: PropTypes.string,
    createdAt: PropTypes.date,
  }),
};

export default AdminRow;
