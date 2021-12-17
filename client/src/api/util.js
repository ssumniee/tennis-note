import api from "./index";

const utilApi = {
  getTempPassword: async () => {
    try {
      const res = await api.get("/util/password");
      if (res.status === 200) return res.data.tempPassword;
    } catch (err) {
      console.error(err);
    }
  },
};

export default utilApi;
