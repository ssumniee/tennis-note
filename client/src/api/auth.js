import api from "./index";

const authApi = {
  login: async (info) => {
    try {
      const res = await api.post("/auth/login", info);
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
  logout: async () => {
    try {
      const res = await api.get("/auth/logout");
      if (res.status === 200) return res;
    } catch (err) {
      console.error(err);
    }
  },
};

export default authApi;
