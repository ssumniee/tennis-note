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
  :new-of-type {
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
  :new-of-type {
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
`;

const InfoInner = styled.div`
  display: flex;
  align-items: center;
`;

const InfoIndex = styled(InfoInner)`
  min-height: 2rem;
  align-self: flex-start;
  flex: 0 0 1;
  font-size: 0.875rem;
  color: var(--color-gray);
  text-align: right;
  margin-right: 4rem;
  width: 6rem;
`;

const InfoContent = styled(InfoInner)`
  flex: 1 1 0;
  display: flex;
  align-items: flex-start;
  ${(props) =>
    props.direction &&
    css`
      flex-direction: ${props.direction};
    `}
`;

const ContentContainer = styled.div`
  .input {
    width: 12rem;
    max-width: 12rem;
    min-height: 2rem;
  }
  display: flex;
  > * {
    margin-right: 0.75rem;
    :last-child {
      margin-right: 0;
    }
  }
`;

const PasswordContentContainer = styled(ContentContainer)`
  flex-direction: column;
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
  .btn {
    display: flex;
    > * {
      margin-right: 0.75rem;
      :last-child {
        margin-right: 0;
      }
    }
  }
  .new {
    ${(props) =>
      props.warn &&
      css`
        .input {
          border-color: var(--color-red);
        }
      `}
  }
  .input-label,
  .warn-msg,
  #find-pw {
    padding: 0.125rem 0;
    font-size: 0.75rem;
  }
  .input-label {
    color: var(--color-gray);
  }
  .warn-msg {
    color: var(--color-red);
  }
  #find-pw {
    align-self: center;
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
  line-height: 2rem;
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
  const [passwords, setPasswords] = useState({ current: "", new: "", check: "" });
  const [warns, setWarns] = useState({ name: false, password: false });

  const handleApplyUpdate = async () => {
    try {
      // 바뀐 정보 clubInfo로 DB 업데이트
      await clubApi.modifyClubInfo(clubInfo);
      // 리덕스 스토어 업데이트
      const res = await authApi.me();
      if (res.status === 200) {
        dispatch(loginAction(res.data));
      }
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
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
    setPasswords({ current: "", new: "", check: "" });
  }, [isEditing]);

  useEffect(() => {
    setClubInfo({
      id: clubId,
      name,
      tel,
      dayoffs: dayList.filter((day) => day.off).map((day) => day.id),
    });
  }, [clubId, name, tel, dayList]);

  useEffect(() => {
    setWarns((prevState) => ({
      ...prevState,
      password: passwords.new && passwords.check && passwords.new !== passwords.check,
    }));
  }, [passwords]);

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
          <InfoIndex>아이디</InfoIndex>
          <InfoContent>
            {isEditing ? (
              <ContentContainer>
                <TextInput
                  className="input"
                  content="name"
                  inputValue={clubInfo.name || ""}
                  setInputValue={setClubInfo}
                />
                <UniqueCheckButton disabled={!clubInfo.name}>중복 확인</UniqueCheckButton>
              </ContentContainer>
            ) : (
              clubInfo.name && clubInfo.name
            )}
          </InfoContent>
        </Info>
        {isEditing && (
          <>
            <Info>
              <InfoIndex>비밀번호</InfoIndex>
              <PasswordContentContainer warn={warns.password}>
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
                  <span id="find-pw">비밀번호를 잊어버리셨나요?</span>
                </div>
              </PasswordContentContainer>
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
