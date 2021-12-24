import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import media from "styled-media-query";
import authApi from "../api/auth";
import clubApi from "../api/club";
import { loginAction, logoutAction } from "../store/actions";
import TextInput from "../components/input/TextInput";
import PasswordInput from "../components/input/PasswordInput";
import MultiSelectInput from "../components/input/MultiSelectInput";
import Table from "../components/table/Table";
import { IoAlertCircle } from "react-icons/io5";
import ResetPwBtn from "../components/ResetPwBtn";

const MypageContainer = styled.div`
  width: 100%;
  max-width: 50rem;
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
  :first-child {
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
  margin: 4rem 0 2rem;
  :first-child {
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
  padding: 0.5rem;
  border-bottom: 1px solid var(--color-palegray);
  :last-child {
    border-bottom: none;
  }
`;

const InfoInner = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
`;

const InfoIndex = styled(InfoInner)`
  width: 8rem;
  min-height: 2rem;
  flex: 0 0 1;
  font-size: 0.875rem;
  color: var(--color-gray);
  text-align: right;
  margin-right: 4rem;
`;

const InfoContent = styled(InfoInner)`
  flex: 1 1 0;
  display: flex;
  ${(props) =>
    props.direction &&
    css`
      flex-direction: ${props.direction};
    `}
`;

const ContentContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .input {
    width: 12rem;
    max-width: 12rem;
    min-height: 2rem;
  }
  > * {
    margin-right: 0;
    margin-top: 0.5rem;
    :first-child {
      margin-top: 0;
    }
  }
  > .btn {
    margin-top: 0.75rem;
  }
  .current,
  .new,
  .btn,
  .username {
    display: flex;
    align-items: center;
    > * {
      margin-right: 0.75rem;
      :last-child {
        margin-right: 0;
      }
    }
  }

  ${(props) =>
    props.warn &&
    css`
      .new,
      .username {
        .input {
          border-color: var(--color-red);
        }
      }
    `}
  .input-label,
  .warn-msg,
  .reset-pw,
  .check-name {
    padding: 0.125rem 0;
    font-size: 0.75rem;
  }
  .input-label {
    align-self: flex-start;
    color: var(--color-gray);
  }
  .warn-msg,
  .check-name {
    color: var(--color-red);
  }
  .reset-pw {
    color: var(--color-blue);
    :hover {
      text-decoration: underline;
    }
  }
`;

const InputButton = styled.button`
  border-radius: 0.25rem;
  font-size: 0.875rem;
  padding: 0 0.75rem;
  max-width: max-content;
  height: 100%;
  min-height: 2rem;
  :hover {
    opacity: 0.8;
  }
  :disabled {
    opacity: 0.4;
  }
`;

const UniqueCheckButton = styled(InputButton)`
  color: var(--color-blue);
  background-color: var(--color-lightblue);
`;

const ChangePasswordButton = styled(InputButton)`
  color: var(--color-white);
  background-color: var(--color-blue);
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 2rem 0;
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
  max-width: 12rem;
  font-size: 0.925rem;
  line-height: 2.25rem;
  padding: 0 1rem;
  margin-right: 0.5rem;
  :last-child {
    margin-right: 0;
  }
  border-radius: 0.5rem;
  text-align: center;
`;

const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isTemp,
    id: clubId,
    username,
    clubname,
    tel,
    days: dayList,
    teachers: teacherList,
    courts: courtList,
  } = useSelector(({ authReducer }) => authReducer);
  const [isEditing, setIsEditing] = useState(false);
  const [clubInfo, setClubInfo] = useState({
    id: clubId,
    username,
    clubname,
    tel,
    dayoffs: dayList.filter((day) => day.off).map((day) => day.id),
  });
  const [usernameUpdated, setUsernameUpdated] = useState(false);
  const [usernameUniqueness, setUsernameUniqueness] = useState("unchecked"); // unchecked, available, banned
  const [passwords, setPasswords] = useState({ current: "", new: "", check: "" });
  const [warns, setWarns] = useState({ username: false, password: false });

  const handleApplyUpdate = async () => {
    try {
      // 아이디를 변경하지 않은 경우, 또는 아이디 중복 검사를 성공적으로 수행한 경우에만
      if (!usernameUpdated || usernameUniqueness === "available") {
        // 바뀐 정보 clubInfo로 DB 업데이트
        await clubApi.modifyClubInfo(clubInfo);
        // 리덕스 스토어 업데이트
        const res = await authApi.me();
        if (res.status === 200) {
          dispatch(loginAction(res.data));
        }
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuitUpdate = () => {
    setClubInfo({
      id: clubId,
      username,
      clubname,
      tel,
      dayoffs: dayList.filter((day) => day.off).map((day) => day.id),
    });
    setIsEditing(false);
  };

  const handleNameUniquenessCheck = async () => {
    try {
      // 아이디 중복 검사
      const res = await clubApi.checkClubUsernameUniqueness(clubInfo.username);
      if (res.status === 200) setUsernameUniqueness("available");
      setUsernameUpdated(true);
    } catch (err) {
      setUsernameUniqueness("banned");
      setUsernameUpdated(true);
    }
  };

  const handleChangePassword = async () => {
    try {
      await clubApi.modifyClubPassword({
        id: clubId,
        password: { current: passwords.current, new: passwords.new },
      });
      setPasswords({ current: "", new: "", check: "" });
      // 리덕스 스토어 업데이트
      const res = await authApi.me();
      if (res.status === 200) {
        dispatch(loginAction(res.data));
      }
    } catch (err) {
      console.error(err);
    }
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

  useEffect(() => {
    setUsernameUpdated(false);
  }, [clubInfo.username]);

  useEffect(() => {
    setWarns((prevState) => ({
      ...prevState,
      username: usernameUpdated && usernameUniqueness !== "available",
    }));
  }, [usernameUpdated, usernameUniqueness]);

  useEffect(() => {
    setWarns((prevState) => ({
      ...prevState,
      password: passwords.new && passwords.check && passwords.new !== passwords.check,
    }));
  }, [passwords]);

  useEffect(() => {
    if (!usernameUpdated) {
      setUsernameUniqueness("unchecked");
      setPasswords({ current: "", new: "", check: "" });
      setWarns({ username: false, password: false });
    }
  }, [isEditing, usernameUpdated]);

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
          <InfoIndex>클럽명</InfoIndex>
          <ContentContainer>
            <InfoContent>
              {isEditing ? (
                <TextInput
                  className="input"
                  content="clubname"
                  inputValue={clubInfo.clubname || ""}
                  setInputValue={setClubInfo}
                />
              ) : (
                clubInfo.clubname && clubInfo.clubname
              )}
            </InfoContent>
          </ContentContainer>
        </Info>
        <Info>
          <InfoIndex>아이디</InfoIndex>
          <ContentContainer warn={warns.username}>
            <InfoContent>
              {isEditing ? (
                <>
                  <div className="username">
                    <TextInput
                      className="input"
                      content="username"
                      inputValue={clubInfo.username || ""}
                      setInputValue={setClubInfo}
                    />
                    <UniqueCheckButton
                      disabled={!clubInfo.username || clubInfo.username === username}
                      onClick={handleNameUniquenessCheck}
                    >
                      중복 확인
                    </UniqueCheckButton>
                  </div>
                  {warns.username && (
                    <span className="check-name">
                      {usernameUniqueness === "unchecked" && "아이디 중복 확인을 해주세요."}
                      {usernameUniqueness === "banned" && "사용할 수 없는 아이디입니다."}
                    </span>
                  )}
                </>
              ) : (
                clubInfo.username && clubInfo.username
              )}
            </InfoContent>
          </ContentContainer>
        </Info>
        {isEditing && (
          <>
            <Info>
              <InfoIndex>비밀번호</InfoIndex>
              <ContentContainer warn={warns.password}>
                <div className="current">
                  <InfoContent direction="column">
                    <span className="input-label" id="current-pw">
                      현재 비밀번호
                    </span>
                    <PasswordInput
                      className="input"
                      content="current"
                      inputValue={passwords.current}
                      setInputValue={setPasswords}
                      editable
                    />
                  </InfoContent>
                </div>
                <div className="new">
                  <InfoContent direction="column">
                    <span className="input-label" id="new-pw">
                      새 비밀번호
                    </span>
                    <PasswordInput
                      className="input"
                      content="new"
                      inputValue={passwords.new}
                      setInputValue={setPasswords}
                      editable
                    />
                  </InfoContent>
                  <InfoContent direction="column">
                    <span className="input-label" id="check-pw">
                      새 비밀번호 확인
                    </span>
                    <PasswordInput
                      className="input"
                      content="check"
                      inputValue={passwords.check}
                      setInputValue={setPasswords}
                      editable
                    />
                  </InfoContent>
                </div>
                {warns.password && <span className="warn-msg">비밀번호가 일치하지 않습니다.</span>}
                <div className="btn">
                  <ChangePasswordButton
                    disabled={
                      !passwords.current || !passwords.new || !passwords.check || warns.password
                    }
                    onClick={handleChangePassword}
                  >
                    비밀번호 변경
                  </ChangePasswordButton>
                  <ResetPwBtn className="reset-pw" />
                </div>
              </ContentContainer>
            </Info>
          </>
        )}
        <Info>
          <InfoIndex>전화번호</InfoIndex>
          <ContentContainer>
            <InfoContent>
              {isEditing ? (
                <TextInput
                  className="input"
                  content="tel"
                  inputValue={clubInfo.tel || ""}
                  setInputValue={setClubInfo}
                />
              ) : (
                clubInfo.tel && clubInfo.tel
              )}
            </InfoContent>
          </ContentContainer>
        </Info>
        <Info>
          <InfoIndex>휴무일</InfoIndex>
          <ContentContainer>
            <InfoContent>
              {dayList.length &&
                (isEditing ? (
                  <MultiSelectInput
                    className="input"
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
                ))}
            </InfoContent>
          </ContentContainer>
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
