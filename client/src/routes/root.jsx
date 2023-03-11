import React from "react";
import ImageContainer from "../components/ImageContainer";
import CtaContainer from "../components/CtaContainer";
import "./Root.css";

const Root = () => {
  return (
    <div className="root-container">
      <ImageContainer />
      <CtaContainer />
    </div>
  );
};

export default Root;
