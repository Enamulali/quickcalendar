import Image from "../assets/login-image.jpg";

const LoginImage = ({ quote }) => {
  return (
    <div className="image-container">
      <img src={Image} alt="Login" />
      <h1>{quote}</h1>
    </div>
  );
};

export default LoginImage;
