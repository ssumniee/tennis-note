import api from "./index";

const tableApi = {
  getAllUserInfo: async (clubId) => {
    try {
      const res = await api.get(`/table/${clubId}`);
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  modifyUserInfo: async (clubId, userInfo) => {
    try {
      const res = await api.put(`/table/${clubId}`, { updated: { ...userInfo } });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  addUserInfo: async (clubId, newInfo) => {
    try {
      const { user, days } = newInfo;
      const res = await api.post(`/table/${clubId}`, { user, days });
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
};

export default tableApi;
