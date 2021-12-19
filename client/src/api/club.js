import api from "./index";

const clubApi = {
  getAllClubInfo: async () => {
    try {
      const res = await api.get("/club");
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  modifyClubInfo: async (clubInfo) => {
    try {
      const res = await api.put("/club", { updated: { ...clubInfo } });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  modifyClubPassword: async ({ id, password }) => {
    try {
      const res = await api.put("/club/password", { id, password });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  addClubInfo: async (newClubInfo) => {
    try {
      const res = await api.post("/club", { ...newClubInfo });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  deleteClubInfo: async (clubId) => {
    try {
      const res = await api.delete("/club", {
        data: {
          id: clubId,
        },
      });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  modifyTeacherInfo: async (teacherInfo) => {
    try {
      const res = await api.put("/club/teacher", { updated: { ...teacherInfo } });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  addTeacherInfo: async (newTeacherInfo) => {
    try {
      const res = await api.post("/club/teacher", { ...newTeacherInfo });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  deleteTeacherInfo: async (teacherId) => {
    try {
      const res = await api.delete("/club/teacher", {
        data: {
          id: teacherId,
        },
      });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  modifyCourtInfo: async (courtInfo) => {
    try {
      const res = await api.put("/club/court", { updated: { ...courtInfo } });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  addCourtInfo: async (newCourtInfo) => {
    try {
      const res = await api.post("/club/court", { ...newCourtInfo });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  deleteCourtInfo: async (courtId) => {
    try {
      const res = await api.delete("/club/court", {
        data: {
          id: courtId,
        },
      });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
};

export default clubApi;
