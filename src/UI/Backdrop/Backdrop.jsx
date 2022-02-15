import React from "react";

const Backdrop = ({ children, onClick }) => {
  return <div className="backdrop" onClick={onClick}></div>;
};

export default Backdrop;
