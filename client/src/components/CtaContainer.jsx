import { Link } from "react-router-dom";

const CtaContainer = () => {
  return (
    <div className="cta-container">
      <h2>Get started now!</h2>
      <div>
        <Link to="/login" className="btn btn-primary me-3">
          Login
        </Link>
        <Link to="/register" className="btn btn-secondary">
          Register
        </Link>
      </div>
    </div>
  );
};

export default CtaContainer;
