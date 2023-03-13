import { Link } from "react-router-dom";
import LoginImage from "../components/LoginImage";
import RegisterForm from "../components/RegisterForm";
import Image from "../assets/register-image.jpg";
import "./Login.css";

const Register = () => {
  const QUOTES_ARRAY = [
    "Start your journey today",
    "Unlock your full potential",
    "Build a better tomorrow",
    "Create your path to success",
    "Embrace change and grow",
    "Transform yourself, one day at a time",
    "Join the community of achievers",
    "Discover your true potential",
  ];

  const randomItem = Math.floor(Math.random() * QUOTES_ARRAY.length);
  const quote = QUOTES_ARRAY[randomItem];

  return (
    <div className="login-container">
      <LoginImage quote={quote} image={Image} />
      <div className="form-container">
        <RegisterForm />
        <p className="mt-3">
          Already have an account?{" "}
          <Link to="/login" className="link-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
