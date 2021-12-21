import api from "./index";

const studentApi = {
  getAllStudentInfo: () => api.get("/student"),
  modifyStudentInfo: (studentInfo) => api.put("/student", { updated: { ...studentInfo } }),
  addStudentInfo: (newStudentInfo) => {
    const { student, days } = newStudentInfo;
    return api.post("/student", { student, days });
  },
  deleteStudentInfo: (studentId) =>
    api.delete("/student", {
      data: {
        id: studentId,
      },
    }),
};

export default studentApi;
