import api from "./index";

const authApi = {
  login: (info) => api.post("/auth/login", info),
  logout: () => api.get("/auth/logout"),
  me: () => api.get("/auth/me"),
};

export default authApi;
