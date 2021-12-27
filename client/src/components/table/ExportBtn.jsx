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

const ExportBtn = ({ subject, infoList }) => {
  const {
    teachers: teacherList,
    days: dayList,
    courts: courtList,
  } = useSelector(({ authReducer }) => authReducer);

  const exportTableData = () => {
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
          data["요일"] = dayIds.map((id) => dayList.find((day) => day.id === id)?.name).join(", ");
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
    // 엑셀 파일로 다운로드
    const ws = xlsx.utils.json_to_sheet(dataList);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, `${subject}`);
    const today = new Date();
    const fileName = `${today.getFullYear()}${
      today.getMonth() + 1
    }${today.getDate()}-${subject}.xlsx`;
    xlsx.writeFile(wb, fileName);
  };

  return (
    <TopBarBtn className="export" onClick={exportTableData}>
      <p>다운로드</p>
      <BsCloudArrowDown className="icon" />
    </TopBarBtn>
  );
};

ExportBtn.propTypes = {
  subject: PropTypes.string,
  infoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      num: PropTypes.number,
      name: PropTypes.string,
      username: PropTypes.string,
      clubname: PropTypes.string,
      club_id: PropTypes.number,
      teacher_id: PropTypes.number,
      tel: PropTypes.string,
      start_date: PropTypes.string,
      count: PropTypes.number,
      days: PropTypes.arrayOf(PropTypes.number),
      password: PropTypes.string,
      createdAt: PropTypes.date,
      court_id: PropTypes.number,
    })
  ),
};

export default ExportBtn;
