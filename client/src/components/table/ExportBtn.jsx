import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { BsCloudArrowDown } from "react-icons/bs";
import TopBarBtn from "./TopBarBtn";
import xlsx from "xlsx";

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

const ExportBtn = ({ subject, infoList, fontSize }) => {
  const {
    teachers: teacherList,
    days: dayList,
    courts: courtList,
  } = useSelector(({ authReducer }) => authReducer);

  const exportTableData = () => {
    const wb = xlsx.utils.book_new(); // 워크북 생성
    if (subject === "club") {
      // 데이터 가공 & 워크시트 생성
      const dataList = { admin: [], temp: [], club: [] };
      const ws = {};
      for (const infoProp in infoList) {
        infoList[infoProp].forEach((info) => {
          const data = {};
          for (const prop in heads.club) {
            data[heads.club[prop]] = info[prop];
          }
          dataList[infoProp].push(data);
        });
        ws[infoProp] = xlsx.utils.json_to_sheet(dataList[infoProp]);
        xlsx.utils.book_append_sheet(wb, ws[infoProp], `${infoProp}`);
      }
    } else {
      // 데이터 가공
      const dataList = [];
      infoList.forEach((info) => {
        const data = {};
        for (const prop in heads[subject]) {
          data[heads[subject][prop]] = info[prop];
        }
        dataList.push(data);
      });
      switch (subject) {
        case "student":
          dataList.forEach((data) => {
            const teacherId = data["선생님"];
            data["선생님"] = teacherList.find((teacher) => teacher.id === teacherId)?.name || "";
            const dayIds = data["요일"];
            data["요일"] = dayIds
              .map((id) => dayList.find((day) => day.id === id)?.name)
              .join(", ");
          });
          break;
        case "teacher":
          dataList.forEach((data) => {
            const courtId = data["코트"];
            data["코트"] = courtList.find((court) => court.id === courtId)?.name || "";
          });
          break;
        default:
          break;
      }
      // 워크시트 생성
      const ws = xlsx.utils.json_to_sheet(dataList);
      xlsx.utils.book_append_sheet(wb, ws, `${subject}`);
    }
    // [yyyyMMdd]-[subject(복수형)] 형태로 파일명 생성
    const today = new Date();
    const fileName = `${today.getFullYear()}${
      today.getMonth() + 1
    }${today.getDate()}-${subject}s.xlsx`;
    xlsx.writeFile(wb, fileName); // 엑셀 파일 다운로드
  };

  return (
    <TopBarBtn className="export" onClick={exportTableData} fontSize={fontSize}>
      <p>다운로드</p>
      <BsCloudArrowDown className="icon" />
    </TopBarBtn>
  );
};

ExportBtn.propTypes = {
  subject: PropTypes.string,
  infoList: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        num: PropTypes.number,
        name: PropTypes.string,
        club_id: PropTypes.number,
        teacher_id: PropTypes.number,
        tel: PropTypes.string,
        start_date: PropTypes.string,
        count: PropTypes.number,
        days: PropTypes.arrayOf(PropTypes.number),
        court_id: PropTypes.number,
      })
    ),
    PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          num: PropTypes.number,
          username: PropTypes.string,
          clubname: PropTypes.string,
          password: PropTypes.string,
          createdAt: PropTypes.date,
        })
      )
    ),
  ]),
  fontSize: PropTypes.string,
};

export default ExportBtn;
