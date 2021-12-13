import api from "./index";

const studentApi = {
  getAllStudentInfo: async (clubId) => {
    try {
      const res = await api.get("/student");
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  modifyStudentInfo: async (clubId, studentInfo) => {
    try {
      const res = await api.put("/student", { updated: { ...studentInfo } });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  addStudentInfo: async (clubId, newStudentInfo) => {
    try {
      const { student, days } = newStudentInfo;
      const res = await api.post("/student", { student, days });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  deleteStudentInfo: async (clubId, studentId) => {
    try {
      const res = await api.delete("/student", {
        data: {
          id: studentId,
        },
      });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
};

export default studentApi;
