import React from "react";
import "./styles.scss";
import { RxCross2 } from "react-icons/rx";
import { BsCheckCircle } from "react-icons/bs";
import SuccessIcon from "../../Assets/Images/success.svg";

interface Props {
  mainText: string;
  subText: string;
  onDialogClose: () => void;
}

const SuccessDialogbox: React.FC<Props> = ({
  mainText,
  subText,
  onDialogClose,
}) => {
  return (
    <>
      <div className="dialog-container">
        <div className="dialog-cross-icon">
          {" "}
          <div onClick={onDialogClose}>
            <RxCross2 />
          </div>
        </div>

        <div className="dialog-content-container">
          <div className="tick-icon">
            <img src={SuccessIcon} alt="success-icon" />
          </div>
          <div className="success-text">{mainText}</div>
          <div className="description-text">{subText}</div>
        </div>
      </div>
    </>
  );
};

export default SuccessDialogbox;
