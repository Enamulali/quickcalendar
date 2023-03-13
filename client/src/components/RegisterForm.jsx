import { useState } from "react";
import { registerUser } from "../utils/api";

const RegisterForm = () => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const input = { name: inputName, email: inputEmail, password: inputPassword };
  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser(input)
      .then((user) => {
        console.log(user);

        //TO DO - Login User and redirect to welcome page
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
      </div>
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
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
