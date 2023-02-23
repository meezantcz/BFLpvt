import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOffer, DELETE_OFFER } from "../../redux/slice/OffersSlice";
import "./styles.scss";
import ErrorIcon from "../../Assets/Images/erroricon.svg";

import { FiAlertCircle } from "react-icons/fi";
import { AppDispatch, RootState } from "../../redux/store";

interface Props {
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
  deletedRow: any;
}

const DeleteDialogBox: React.FC<Props> = ({ setShowDelete, deletedRow }) => {
  const dispatch = useDispatch<AppDispatch>();
  const archives = useSelector(
    (state: RootState) => state.offers.ArchivedItems
  );

  console.log("deleteeeroww", deletedRow._id);
  const onNo = () => {
    setShowDelete(false);
  };

  const onYes = () => {
    if (deletedRow) {
      setShowDelete(false);
      dispatch(deleteOffer(deletedRow._id));
    }
  };

  return (
    <>
      <div className="delete-dialog-container">
        <div className="delete-content">
          <div className="delete-dialog-icon">
            <img src={ErrorIcon} alt="error-icon" />
          </div>
          <div className="success-text">DELETE!</div>
          <div className="description-text">
            Are you sure you want to DELETE this offer?
          </div>
        </div>
        <hr></hr>
        <div className="delete-btns">
          <div className="no-btn" onClick={onNo}>
            NO
          </div>
          <div className="vertical-line"></div>
          <div className="yes-btn" onClick={onYes}>
            YES
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteDialogBox;
