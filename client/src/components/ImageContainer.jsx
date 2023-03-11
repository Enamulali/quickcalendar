import CalendarImage from "../assets/calendar-image.jpg";

const ImageContainer = () => {
  return (
    <div className="image-container">
      <img src={CalendarImage} alt="Calendar" />
      <h1>Quick Calendar</h1>
    </div>
  );
};

export default ImageContainer;
