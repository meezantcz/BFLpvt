import React from "react";
import { Modal } from "react-bootstrap";
import "./styles.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogButton from "../DialogButton";
import OfferIcon from "../../Assets/Images/offertypeicon.svg";
import RewardIcon from "../../Assets/Images/rewardtypeicon.svg";
import WebIcon from "../../Assets/Images/computer.svg";
import PhoneIcon from "../../Assets/Images/smartphone.svg";
import BothIcon from "../../Assets/Images/webapp.png";

interface Props {
  setShowCreateOfferDialog: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}

const CreateOfferModal: React.FC<Props> = ({
  setShowCreateOfferDialog,
  show,
}) => {
  const [showFormType, setShowFormType] = useState<boolean>(false);
  const [web, setWeb] = useState<boolean>(false);
  const [app, setApp] = useState<boolean>(false);
  const [both, setBoth] = useState<boolean>(false);
  const [offer, setOffer] = useState<boolean>(false);
  const [reward, setReward] = useState<boolean>(false);
  const navigate = useNavigate();

  const onWebClick = () => {
    setWeb(!web);
    setApp(false);
    setBoth(false);
  };

  const onAppClick = () => {
    setApp(!app);
    setWeb(false);
    setBoth(false);
  };

  const onBothClick = () => {
    setBoth(!both);
    setApp(false);
    setWeb(false);
  };

  const onOffer = () => {
    setOffer(true);
    setReward(false);
    setShowFormType(true);
  };

  const onReward = () => {
    setReward(true);
    setOffer(false);
    setShowFormType(true);
  };

  const onContinue = () => {
    switch (true) {
      case offer && web:
        navigate("/createoffer/web");
        break;
      case offer && app:
        navigate("/createoffer/app");
        break;
      case offer && both:
        navigate("/createoffer/web-app");
        break;
      case reward && web:
        navigate("/createreward/web");
        break;
      case reward && app:
        navigate("/createreward/app");
        break;
      default:
        break;
    }
    setShowCreateOfferDialog(false);
  };
  return (
    <Modal
      show={show}
      size="lg"
      onHide={() => onContinue()}
      className="updated_successfully"
      backdropClassName="backdrop"
    >
      <Modal.Header className="card_header">
        <Modal.Title>
          <h3>Select Type</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className=" card-body container-fluid">
        <div className="offer-reward-container">
          <div
            className={`create-offer-type ${offer ? "active" : ""}`}
            onClick={onOffer}
          >
            <span className="offer-reward-type-icon">
              <img src={OfferIcon} alt="offericon" height="23px" width="20px" />
            </span>
            <span className="offer-reward-type-title">Offers</span>
          </div>
          <div
            className={`create-reward-type ${reward ? "active" : ""}`}
            onClick={onReward}
          >
            <span className="offer-reward-type-icon">
              <img
                src={RewardIcon}
                alt="offericon"
                height="23px"
                width="20px"
              />
            </span>
            <span className="offer-reward-type-title">Reward</span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateOfferModal;
