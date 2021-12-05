import api from "./index";

const clubApi = {
  getAllUserInfo: async (clubId) => {
    try {
      const res = await api.get(`/club/${clubId}`);
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  modifyUserInfo: async (clubId, userInfo) => {
    try {
      const res = await api.put(`/club/${clubId}`, { updated: { ...userInfo } });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
};

export default clubApi;
