import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import media from "styled-media-query";
import AddCell from "./AddCell";
import BtnCell from "./BtnCell";
import NumCell from "./NumCell";
import { HiPlusSm } from "react-icons/hi";
import tableApi from "../../api/table";
import { getAllUserInfoAction } from "../../store/actions";

const AddContainer = styled.form`
  width: 100%;
  min-height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-gray);
  margin-top: 2rem;
  table,
  tbody {
    width: 100%;
    display: flex;
  }
  .plus.text {
    font-size: 1rem;
  }
  ${media.lessThan("medium")`
    display: none;
  `}
`;

const InputContainer = styled.tr`
  width: 100%;
  font-family: Interop-Regular;
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
`;

const heads = {
  name: "이름",
  tel: "전화번호",
  start_date: "시작일",
  teacher_id: "선생님",
  days: "요일",
  duration: "등록 횟수",
};

const AddForm = () => {
  const dispatch = useDispatch();
  const { id: clubId } = useSelector(({ authReducer }) => authReducer);
  const [newUserInfo, setNewUserInfo] = useState({
    name: "",
    tel: "",
    start_date: null,
    teacher_id: "",
    days: [],
    duration: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { name, tel, start_date: start, teacher_id: teacher, days, duration } = newUserInfo;
      const toAdd = {
        user: {
          club_id: clubId,
          name,
          tel: tel || null,
          start_date: start,
          teacher_id: teacher || null,
          count: duration || 0,
        },
        days,
      };
      // 새로운 유저 정보를 userInfo로 DB에 추가
      const res = await tableApi.addUserInfo(clubId, toAdd);
      // 리덕스 스토어 업데이트
      dispatch(getAllUserInfoAction(res.data));
      // 유저 정보 state 초기화
      setNewUserInfo({
        name: "",
        tel: "",
        start_date: null,
        teacher_id: "",
        days: [],
        duration: 0,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AddContainer onSubmit={handleSubmit}>
      <table>
        <tbody>
          <InputContainer>
            <NumCell>
              <HiPlusSm className="plus text" />
            </NumCell>
            {Object.keys(heads).map((id, idx) => (
              <AddCell
                key={idx}
                content={id}
                newUserInfo={newUserInfo}
                setNewUserInfo={setNewUserInfo}
                label={heads[id]}
              />
            ))}
            <BtnCell>
              <button className="submit button" type="submit" disabled={!newUserInfo.name}>
                <HiPlusSm />
              </button>
            </BtnCell>
          </InputContainer>
        </tbody>
      </table>
    </AddContainer>
  );
};

export default AddForm;
