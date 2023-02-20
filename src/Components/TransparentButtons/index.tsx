import React from "react";
import "./styles.scss";

interface Props {
  buttonName: string;
  width: string;
  onClick: () => void;
  buttonImage?: string;
}
const TransparentButtons: React.FC<Props> = ({
  buttonName,
  width,
  onClick,
  buttonImage,
}) => {
  return (
    <button
      className="transparent-btn subtext"
      style={{ width: width }}
      onClick={onClick}
    >
      {buttonImage && (
        <span className="btn-img">
          <img src={buttonImage} alt="btn-img" />
        </span>
      )}
      <span className="orange-btn-text">{buttonName}</span>
    </button>
  );
};

export default TransparentButtons;
