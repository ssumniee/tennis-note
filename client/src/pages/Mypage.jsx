import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import media from "styled-media-query";
import authApi from "../api/auth";
import clubApi from "../api/club";
import { loginAction, logoutAction } from "../store/actions";
import TextInput from "../components/input/TextInput";
import PasswordInput from "../components/input/PasswordInput";
import MultiSelectInput from "../components/input/MultiSelectInput";
import Table from "../components/table/Table";
import { IoAlertCircle } from "react-icons/io5";

const MypageContainer = styled.div`
  width: 100%;
  max-width: 46rem;
  height: 100%;
  margin: 0 auto;
  padding: 2rem;
  ${media.lessThan("medium")`
    padding: 1rem;
  `}
`;

const Alert = styled.div`
  margin: 2rem 0;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  background-color: var(--color-paleblue);
  :first-of-type {
    margin-top: 0;
  }
  font-family: Interop-Medium;
  font-weight: normal;
  font-size: 0.925rem;
  color: var(--color-blue);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .text {
    flex: 1 1 0;
    margin-top: 0.15rem;
  }
  .icon {
    flex: 0 0 1;
    font-size: 1.125rem;
    margin-right: 0.5rem;
    :last-child {
      margin-right: 0;
    }
  }
`;

const Title = styled.h1`
  margin: 2rem 0 1.5rem;
  :first-of-type {
    margin-top: 0;
  }
  padding: 0 1.5rem;
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
  padding: 0.5rem 1.5rem;
  border-top: 1px solid var(--color-palegray);
  :last-child {
    border-bottom: 1px solid var(--color-palegray);
  }
  > div {
    min-height: 2.25rem;
    display: flex;
    align-items: center;
  }
  .index {
    flex: 0 0 1;
    font-size: 0.875rem;
    color: var(--color-gray);
    text-align: right;
    margin-right: 4rem;
    width: 6rem;
  }
  .content {
    flex: 1 1 0;
    max-width: 14rem;
    align-self: stretch;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 1.5rem 0;
  width: 19.5rem;
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
    isTemp,
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
  const [passwords, setPasswords] = useState({ first: "", second: "" });
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
      {isTemp && (
        <Alert>
          <IoAlertCircle className="icon" />
          <p className="text">
            최초 발급된 비밀번호를 변경하셔야만 테니스노트를 사용하실 수 있습니다.
          </p>
        </Alert>
      )}
      <Title>프로필</Title>
      <InfoContainer>
        <Info>
          <div className="index">아이디</div>
          <div className="content">
            {isEditing ? (
              <TextInput
                content="name"
                inputValue={clubInfo.name || ""}
                setInputValue={setClubInfo}
              />
            ) : (
              clubInfo.name && clubInfo.name
            )}
          </div>
        </Info>
        {isEditing && (
          <>
            <Info>
              <div className="index">비밀번호</div>
              <div className="content">
                <PasswordInput
                  content="first"
                  inputValue={passwords.first}
                  setInputValue={setPasswords}
                  editable
                  blurred
                />
              </div>
            </Info>
            <Info>
              <div className="index">비밀번호 확인</div>
              <div className="content">
                <PasswordInput
                  content="second"
                  inputValue={passwords.second}
                  setInputValue={setPasswords}
                  editable
                  blurred
                />
              </div>
            </Info>
            {passwords.first && passwords.second && passwords.first !== passwords.second && (
              <div>비밀번호가 다릅니다.</div>
            )}
          </>
        )}
        <Info>
          <div className="index">전화번호</div>
          <div className="content">
            {isEditing ? (
              <TextInput
                content="tel"
                inputValue={clubInfo.tel || ""}
                setInputValue={setClubInfo}
              />
            ) : (
              clubInfo.tel && clubInfo.tel
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
                inputValue={clubInfo.dayoffs || []}
                setInputValue={setClubInfo}
              />
            ) : (
              clubInfo.dayoffs &&
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
      {!isTemp && (
        <>
          <Title>강사</Title>
          <Table subject="teacher" infoList={teacherList} />
          <Table subject="teacher" isAdding />
          <Title>코트</Title>
          <Table subject="court" infoList={courtList} />
          <Table subject="court" isAdding />
        </>
      )}
    </MypageContainer>
  );
};

export default Mypage;
