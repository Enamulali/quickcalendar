import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090/",
});

export const loginUser = () => {
  const user = { email: "enamul@example.com", password: "password" };

  return api.post("/auth/login", user).then((res) => {
    console.log(res.data);
    return res.data;
  });
};
