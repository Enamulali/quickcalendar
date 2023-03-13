import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090/",
});

export const loginUser = (input) => {
  return api.post("/auth/login", input).then((res) => {
    console.log(res.data);
    return res.data;
  });
};
