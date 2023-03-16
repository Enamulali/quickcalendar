import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";

const LoginForm = () => {
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const input = { email: inputEmail, password: inputPassword };
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.clear("token");
    loginUser(input)
      .then((user) => {
        localStorage.setItem("token", user.token);
      })
      .then(() => navigate("/dashboard"))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
