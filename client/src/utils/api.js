import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090/",
});

// Set the authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (input) => {
  return api.post("/auth/login", input).then((res) => {
    console.log(res.data);
    return res.data;
  });
};

export const registerUser = (input) => {
  return api.post("/auth/", input).then((res) => {
    return res.data;
  });
};

export const getAllEvents = () => {
  return api.get("/events").then((res) => {
    console.log(res.data);
    return res.data;
  });
};
