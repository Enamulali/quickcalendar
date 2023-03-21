import React, { useState } from "react";
import "./SliderToggle.css";

const SliderToggle = ({ onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <div className="slider">
      <div
        className={`slider-option ${!checked ? "active" : ""}`}
        onClick={() => handleChange()}
      >
        List
      </div>
      <div
        className={`slider-option ${checked ? "active" : ""}`}
        onClick={() => handleChange()}
      >
        Calendar
      </div>
    </div>
  );
};

export default SliderToggle;
