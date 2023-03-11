import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import LoginImage from "../components/LoginImage";
import "./Login.css";

const Login = () => {
  const QUOTES_ARRAY = [
    "Your calendar, your journey",
    "Take control of your day",
    "Make every day count",
    "Your future starts now",
    "Achieve your goals, one day at a time",
    "Unleash your potential, every day",
    "Stay on track, achieve your dreams",
    "Transform your life, day by day",
    "Consistency is key to greatness",
  ];

  const randomItem = Math.floor(Math.random() * QUOTES_ARRAY.length);
  const quote = QUOTES_ARRAY[randomItem];

  return (
    <div className="login-container">
      <LoginImage quote={quote} />
      <div className="form-container">
        <LoginForm />
        <p className="mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="link-primary">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
