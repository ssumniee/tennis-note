import api from "./index";

const clubApi = {
  getAllClubInfo: () => api.get("/club"),
  getOneClubId: async (queries) => {
    try {
      const queryString = Object.keys(queries)
        .map((query) => `${query}=${queries[query]}`)
        .join("&");
      const res = await api.get(`/club/id?${queryString}`);
      if (res.status === 200) return res.data.club_id;
    } catch (err) {
      console.error(err);
    }
  },
  modifyClubInfo: (clubInfo) => api.put("/club", { updated: { ...clubInfo } }),
  checkClubUsernameUniqueness: (username) => api.post("/club/username", { username }),
  modifyClubPassword: ({ id, password }) => api.put("/club/password", { id, password }),
  resetClubPassword: ({ id, password }) => api.post("/club/password", { id, password }),
  addClubInfo: (newClubInfo) => api.post("/club", { ...newClubInfo }),
  deleteClubInfo: (clubId) =>
    api.delete("/club", {
      data: {
        id: clubId,
      },
    }),
  modifyTeacherInfo: (teacherInfo) => api.put("/club/teacher", { updated: { ...teacherInfo } }),
  addTeacherInfo: (newTeacherInfo) => api.post("/club/teacher", { ...newTeacherInfo }),
  deleteTeacherInfo: (teacherId) =>
    api.delete("/club/teacher", {
      data: {
        id: teacherId,
      },
    }),
  modifyCourtInfo: (courtInfo) => api.put("/club/court", { updated: { ...courtInfo } }),
  addCourtInfo: (newCourtInfo) => api.post("/club/court", { ...newCourtInfo }),
  deleteCourtInfo: (courtId) =>
    api.delete("/club/court", {
      data: {
        id: courtId,
      },
    }),
};

export default clubApi;
