import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import media from "styled-media-query";
import authApi from "../api/auth";
import clubApi from "../api/club";
import { loginAction, logoutAction } from "../store/actions";
import TextInput from "../components/input/TextInput";
import MultiSelectInput from "../components/input/MultiSelectInput";
import Table from "../components/table/MypageTable";

const MypageContainer = styled.div`
  width: 100vw;
  height: 100%;
  padding: 2rem;
  ${media.lessThan("medium")`
    padding: 1rem;
  `}
`;

const Title = styled.h1`
  margin: 2rem 0 1.5rem;
  :first-of-type {
    margin-top: 0;
  }
  font-size: 1.25rem;
  font-family: Interop-Medium;
  font-weight: normal;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Info = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  :last-child {
    margin-bottom: 0;
  }
  align-items: center;
  > div {
    min-height: 2rem;
    display: flex;
    align-items: center;
  }
  .index {
    flex: 0 0 1;
    color: var(--color-gray);
    text-align: right;
    margin-right: 2rem;
    width: 5rem;
  }
  .content {
    flex: 1 1 0;
    max-width: 13rem;
    align-self: stretch;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 1.5rem 0;
  width: 20rem;
  #edit,
  #cancel {
    border: 1px solid var(--color-blue);
    color: var(--color-blue);
    :hover {
      background-color: var(--color-paleblue);
    }
  }
  #apply {
    background-color: var(--color-blue);
    color: var(--color-white);
    :hover {
      opacity: 0.8;
    }
  }
`;

const Button = styled.button`
  flex: 1 1 0;
  font-size: 0.925rem;
  line-height: 2.25rem;
  padding: 0 1rem;
  margin-right: 0.5rem;
  :last-child {
    margin-right: 0;
  }
  border-radius: 0.25rem;
  text-align: center;
`;

const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    id: clubId,
    name,
    tel,
    days: dayList,
    teachers: teacherList,
    courts: courtList,
  } = useSelector(({ authReducer }) => authReducer);
  const [isEditing, setIsEditing] = useState(false);
  const [clubInfo, setClubInfo] = useState({
    id: clubId,
    name,
    tel,
    dayoffs: dayList.filter((day) => day.off).map((day) => day.id),
  });

  const handleApplyUpdate = async () => {
    // 바뀐 정보 clubInfo로 DB 업데이트
    await clubApi.modifyClubInfo(clubInfo);
    // 리덕스 스토어 업데이트
    const res = await authApi.me();
    if (res.status === 200) {
      dispatch(loginAction(res.data));
    }
    setIsEditing(false);
  };

  const handleQuitUpdate = () => {
    setClubInfo({
      id: clubId,
      name,
      tel,
      dayoffs: dayList.filter((day) => day.off).map((day) => day.id),
    });
    setIsEditing(false);
  };

  useEffect(() => {
    const checkValidUser = async () => {
      try {
        const res = await authApi.me();
        if (res.status === 200) {
          dispatch(loginAction(res.data));
        }
      } catch (error) {
        // 토큰 만료의 경우 error.response.status가 403인 경우를 조건으로 -> 로그아웃 후 Signing으로 리디렉션
        // 다만, res.data가 제대로 넘어오지 않은 경우 등의 예외적인 에러에 대해서도 로그아웃 후 리디렉션 시키기 위해 조건문 생략
        dispatch(logoutAction);
        navigate("/", { replace: true });
      }
    };
    checkValidUser();
  }, []);

  useEffect(() => {
    setClubInfo({
      id: clubId,
      name,
      tel,
      dayoffs: dayList.filter((day) => day.off).map((day) => day.id),
    });
  }, [clubId, name, tel, dayList]);

  return (
    <MypageContainer>
      <Title>프로필</Title>
      <InfoContainer>
        <Info>
          <div className="index">아이디</div>
          <div className="content">
            {isEditing ? (
              <TextInput content="name" inputValue={clubInfo.name} setInputValue={setClubInfo} />
            ) : (
              clubInfo.name
            )}
          </div>
        </Info>
        <Info>
          <div className="index">전화번호</div>
          <div className="content">
            {isEditing ? (
              <TextInput content="tel" inputValue={clubInfo.tel} setInputValue={setClubInfo} />
            ) : (
              clubInfo.tel
            )}
          </div>
        </Info>
        <Info>
          <div className="index">휴무일</div>
          <div className="content">
            {isEditing ? (
              <MultiSelectInput
                content="dayoffs"
                list={dayList}
                inputValue={clubInfo.dayoffs}
                setInputValue={setClubInfo}
              />
            ) : (
              clubInfo.dayoffs
                .map((offId) => dayList.find((day) => day.id === offId).name + "요일")
                .join(", ")
            )}
          </div>
        </Info>
      </InfoContainer>
      <ButtonContainer>
        {isEditing ? (
          <>
            <Button id="cancel" onClick={handleQuitUpdate}>
              취소
            </Button>
            <Button id="apply" onClick={handleApplyUpdate}>
              확인
            </Button>
          </>
        ) : (
          <Button
            id="edit"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            프로필 수정
          </Button>
        )}
      </ButtonContainer>
      <Title>강사</Title>
      <Table subject="teacher" infoList={teacherList} />
      <Table subject="teacher" isAdding />
      <Title>코트</Title>
      <Table subject="court" infoList={courtList} />
      <Table subject="court" isAdding />
    </MypageContainer>
  );
};

export default Mypage;
