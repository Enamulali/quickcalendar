const LoginImage = ({ quote, image }) => {
  return (
    <div className="image-container">
      <img src={image} alt="Login" />
      <h1>{quote}</h1>
    </div>
  );
};

export default LoginImage;
