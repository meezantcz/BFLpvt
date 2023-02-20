import React from "react";
import "./styles.scss";

interface Props {
  buttonName: string;
  width: string;
  onDialogButtonClick: any;
}

const DialogButton: React.FC<Props> = ({
  buttonName,
  width,
  onDialogButtonClick,
}) => {
  return (
    <button
      className="dialog-btn"
      onClick={onDialogButtonClick}
      style={{ width: width }}
    >
      <span className="dialog-btn-name">{buttonName}</span>
    </button>
  );
};

export default DialogButton;
