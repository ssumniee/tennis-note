import api from "./index";

const clubApi = {
  getAllUserInfo: async (id) => {
    try {
      const res = await api.get(`/club/${id}`);
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
};

export default clubApi;
