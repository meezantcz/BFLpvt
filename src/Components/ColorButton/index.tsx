import React from "react";
import "./styles.scss";

interface Props {
  buttonName: string;
  width: string;
  onClick: () => any;
}

const ColorButton: React.FC<Props> = ({ buttonName, width, onClick }) => {
  return (
    <button className="color-btn" style={{ width: width }} onClick={onClick}>
      <span className="subtext txt-white">{buttonName}</span>
    </button>
  );
};

export default ColorButton;
