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
};

export default clubApi;
