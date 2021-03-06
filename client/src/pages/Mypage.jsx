import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import media from "styled-media-query";
import authApi from "../api/auth";
import clubApi from "../api/club";
import { loginAction, logoutAction, windowOffAction } from "../store/actions";
import TextInput from "../components/input/TextInput";
import PasswordInput from "../components/input/PasswordInput";
import MultiSelectInput from "../components/input/MultiSelectInput";
import Table from "../components/table/Table";
import ResetPwBtn from "../components/ResetPwBtn";
import TitleArea from "../components/TitleArea";
import ExportBtn from "../components/table/ExportBtn";
import { IoAlertCircle } from "react-icons/io5";
import { BsCheck } from "react-icons/bs";

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
  font-size: 1.125rem;
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
  ${media.between("small", "medium")`
    margin-right: 2rem;
  `}
  ${media.lessThan("small")`
    width: 4rem;
    margin-right: 1rem;
  `}
`;

const InfoContent = styled(InfoInner)`
  flex: 1 1 0;
  display: flex;
  ${(props) =>
    props.direction === "column"
      ? css`
          flex-direction: ${props.direction};
          > * {
            margin: 0.5rem 0 0;
            :first-child {
              margin-top: 0;
            }
          }
        `
      : css`
          > * {
            margin: 0 0 0 0.5rem;
            :first-child {
              margin-left: 0;
            }
          }
        `}
  ${media.lessThan("medium")`
    flex-direction: column;
    align-items: flex-start;
    > * {
      margin: 0.5rem 0 0;
      :first-child {
        margin-top: 0;
      }
    }
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
    ${media.lessThan("medium")`
      width: 9.25rem;
    `}
  }
  > * {
    margin: 0.5rem 0 0;
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
  ${media.lessThan("small")`
    .new,
    .btn {
      flex-direction: column;
      align-items: flex-start;
      > * {
        margin-bottom: 0.25rem;
        :last-child {
          margin-bottom: 0;
        }
      }
    }
  `}

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
  .reset-pw,
  .warn-msg,
  .ok-msg {
    padding: 0.125rem 0;
    font-size: 0.75rem;
  }
  .input-label {
    align-self: flex-start;
    color: var(--color-gray);
  }
  .reset-pw {
    color: var(--color-darkgray);
    :hover {
      text-decoration: underline;
    }
  }
  .warn-msg {
    color: var(--color-red);
  }
  .ok-msg {
    color: var(--color-blue);
    display: flex;
    align-items: center;
    .check {
      font-size: calc(1em + 0.5rem);
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
  ${media.lessThan("small")`
    max-width: unset;
    width: 100%;
    height: 2.5rem;
  `}
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
  const [profileEditing, setProfileEditing] = useState(false);
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
  const [okays, setOkays] = useState({ username: false, password: false });

  const handleApplyUpdate = async (event) => {
    event.preventDefault();
    try {
      // ???????????? ???????????? ?????? ??????, ?????? ????????? ?????? ????????? ??????????????? ????????? ????????????
      if (!usernameUpdated || usernameUniqueness === "available") {
        // ?????? ?????? clubInfo??? DB ????????????
        await clubApi.modifyClubInfo(clubInfo);
        // ????????? ????????? ????????????
        const res = await authApi.me();
        if (res.status === 200) {
          dispatch(loginAction(res.data));
        }
        setProfileEditing(false);
      } else {
        // ????????? ?????? ????????? ??????????????? ???????????? ?????? ??????
        setWarns((prevState) => ({ ...prevState, username: true }));
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
    setProfileEditing(false);
  };

  const handleNameUniquenessCheck = async (event) => {
    event.preventDefault();
    try {
      // ????????? ?????? ??????
      const res = await clubApi.checkClubUsernameUniqueness(clubInfo.username);
      if (res.status === 200) setUsernameUniqueness("available");
      // setUsernameUpdated(true);
    } catch (err) {
      setUsernameUniqueness("banned");
      // setUsernameUpdated(true);
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      await clubApi.modifyClubPassword({
        id: clubId,
        password: { current: passwords.current, new: passwords.new },
      });
      setPasswords({ current: "", new: "", check: "" });
      // ????????? ????????? ????????????
      const res = await authApi.me();
      if (res.status === 200) {
        dispatch(loginAction(res.data));
      }
      setOkays((prevState) => ({ ...prevState, password: true }));
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
        // ?????? ????????? ?????? error.response.status??? 403??? ????????? ???????????? -> ???????????? ??? Signing?????? ????????????
        // ??????, res.data??? ????????? ???????????? ?????? ?????? ?????? ???????????? ????????? ???????????? ???????????? ??? ???????????? ????????? ?????? ????????? ??????
        dispatch(logoutAction);
        navigate("/", { replace: true });
      }
    };
    checkValidUser();
  }, []);

  useEffect(() => {
    setClubInfo({
      id: clubId,
      username,
      clubname,
      tel,
      dayoffs: dayList.filter((day) => day.off).map((day) => day.id),
    });
  }, [clubId, username, clubname, tel, dayList]);

  useEffect(() => {
    setWarns((prevState) => ({ ...prevState, username: false }));
    setOkays((prevState) => ({ ...prevState, username: false }));
    setUsernameUpdated(clubInfo.username && clubInfo.username !== username);
    setUsernameUniqueness("unchecked");
  }, [clubInfo.username]);

  useEffect(() => {
    setWarns((prevState) => ({
      ...prevState,
      username: usernameUpdated && usernameUniqueness !== "available",
    }));
    setOkays((prevState) => ({
      ...prevState,
      username: usernameUpdated && usernameUniqueness === "available",
    }));
  }, [usernameUniqueness]);

  useEffect(() => {
    setWarns((prevState) => ({
      ...prevState,
      password: passwords.new && passwords.check && passwords.new !== passwords.check,
    }));
    setOkays((prevState) => ({ ...prevState, password: false }));
  }, [passwords]);

  useEffect(() => {
    dispatch(windowOffAction);
  }, []);

  useEffect(() => {
    setUsernameUpdated(false);
    setUsernameUniqueness("unchecked");
    setPasswords({ current: "", new: "", check: "" });
    setWarns({ username: false, password: false });
    setOkays({ username: false, password: false });
  }, [profileEditing]);

  return (
    <MypageContainer>
      {isTemp && (
        <Alert>
          <IoAlertCircle className="icon" />
          <p className="text">
            ?????? ????????? ??????????????? ?????????????????? ?????????????????? ???????????? ??? ????????????.
          </p>
        </Alert>
      )}
      <TitleArea>
        <Title>?????????</Title>
      </TitleArea>
      <InfoContainer>
        <Info>
          <InfoIndex>?????????</InfoIndex>
          <ContentContainer>
            <InfoContent>
              {profileEditing ? (
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
          <InfoIndex>?????????</InfoIndex>
          <ContentContainer warn={warns.username}>
            <InfoContent>
              {profileEditing ? (
                <>
                  <div className="username">
                    <TextInput
                      className="input"
                      content="username"
                      inputValue={clubInfo.username || ""}
                      setInputValue={setClubInfo}
                    />
                    <UniqueCheckButton
                      disabled={!usernameUpdated}
                      onClick={handleNameUniquenessCheck}
                    >
                      ?????? ??????
                    </UniqueCheckButton>
                  </div>
                  {warns.username && (
                    <span className="warn-msg">
                      {usernameUniqueness === "unchecked" && "????????? ?????? ????????? ????????????."}
                      {usernameUniqueness === "banned" && "????????? ??? ?????? ??????????????????."}
                    </span>
                  )}
                  {okays.username && usernameUniqueness === "available" && (
                    <span className="ok-msg">
                      <BsCheck className="check" />
                      ?????? ????????? ??????????????????.
                    </span>
                  )}
                </>
              ) : (
                clubInfo.username && clubInfo.username
              )}
            </InfoContent>
          </ContentContainer>
        </Info>
        {profileEditing && (
          <>
            <Info>
              <InfoIndex>????????????</InfoIndex>
              <ContentContainer warn={warns.password}>
                <div className="current">
                  <InfoContent direction="column">
                    <span className="input-label" id="current-pw">
                      ?????? ????????????
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
                      ??? ????????????
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
                      ??? ???????????? ??????
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
                {warns.password && <span className="warn-msg">??????????????? ???????????? ????????????.</span>}
                <div className="btn">
                  <ChangePasswordButton
                    disabled={
                      !passwords.current || !passwords.new || !passwords.check || warns.password
                    }
                    onClick={handleChangePassword}
                  >
                    ???????????? ??????
                  </ChangePasswordButton>
                  <ResetPwBtn className="reset-pw" />
                </div>
                {okays.password && (
                  <span className="ok-msg">
                    <BsCheck className="check" />
                    ??????????????? ?????????????????????.
                  </span>
                )}
              </ContentContainer>
            </Info>
          </>
        )}
        <Info>
          <InfoIndex>????????????</InfoIndex>
          <ContentContainer>
            <InfoContent>
              {profileEditing ? (
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
          <InfoIndex>?????????</InfoIndex>
          <ContentContainer>
            <InfoContent>
              {dayList.length &&
                (profileEditing ? (
                  <MultiSelectInput
                    className="input"
                    content="dayoffs"
                    list={dayList}
                    inputValue={clubInfo.dayoffs || []}
                    setInputValue={setClubInfo}
                    allEnabled
                  />
                ) : (
                  clubInfo.dayoffs &&
                  clubInfo.dayoffs
                    .map((offId) => dayList.find((day) => day.id === offId).name + "??????")
                    .join(", ")
                ))}
            </InfoContent>
          </ContentContainer>
        </Info>
      </InfoContainer>
      <ButtonContainer>
        {profileEditing ? (
          <>
            <Button id="cancel" onClick={handleQuitUpdate}>
              ??????
            </Button>
            <Button id="apply" onClick={handleApplyUpdate}>
              ??????
            </Button>
          </>
        ) : (
          <Button
            id="edit"
            onClick={() => {
              setProfileEditing(true);
            }}
          >
            ????????? ??????
          </Button>
        )}
      </ButtonContainer>
      {!isTemp && (
        <>
          <TitleArea>
            <Title>??????</Title>
            <ExportBtn subject="teacher" infoList={teacherList} />
          </TitleArea>
          <Table subject="teacher" infoList={teacherList} />
          <Table subject="teacher" isAdding />
          <TitleArea>
            <Title>??????</Title>
            <ExportBtn subject="court" infoList={courtList} />
          </TitleArea>
          <Table subject="court" infoList={courtList} />
          <Table subject="court" isAdding />
        </>
      )}
    </MypageContainer>
  );
};

export default Mypage;
