import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AddCell from "./AddCell";
import BtnCell from "./BtnCell";
import { HiPlusSm } from "react-icons/hi";

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
`;

const InputContainer = styled.tr`
  width: 100%;
  font-family: Interop-Regular;
  font-size: 0.875rem;
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
  duration: "등록 기간",
};

const Add = () => {
  const { id: clubId } = useSelector(({ authReducer }) => authReducer);
  const [newUserInfo, setNewUserInfo] = useState({
    num: "+",
    name: "",
    tel: "",
    start_date: null,
    teacher_id: "",
    days: [],
    duration: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { name, tel, start_date: start, teacher_id: teacher, days, duration } = newUserInfo;
      const toAdd = {
        club_id: clubId,
        name,
        tel,
        start_date: start,
        teacher_id: teacher || null,
        days,
        count: duration * days.length,
      };
      console.log(toAdd);
      // TODO: toAdd 정보로 새로운 유저 추가
      // TODO: 유저 목록 업데이트
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AddContainer onSubmit={handleSubmit}>
      <table>
        <tbody>
          <InputContainer>
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

export default Add;
