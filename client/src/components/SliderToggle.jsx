import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./SliderToggle.css";

const SliderToggle = ({ onChange, setView }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
    setView(newChecked ? "calendar" : "list");
  };

  return (
    <Form.Check
      type="switch"
      id="custom-switch"
      label="List View"
      checked={checked}
      onChange={handleChange}
    />
  );
};

export default SliderToggle;
