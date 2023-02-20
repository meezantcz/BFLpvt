import { useState } from "react";
import ColorButton from "../ColorButton";
import TransparentButtons from "../TransparentButtons";

import "./styles.scss";

import { useLocation, useNavigate } from "react-router-dom";
import CreateDuplicateIcon from "../../Assets/Images/duplicate.svg";

interface Props {
  offerRewardData: any;
  setShowCreateMultipleOfferReward: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setShowOfferRewardCreated: React.Dispatch<React.SetStateAction<boolean>>;
  reward?: boolean;
}

const CreateMultipleDialog: React.FC<Props> = ({
  offerRewardData,
  setShowCreateMultipleOfferReward,
  setShowOfferRewardCreated,
  reward,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onNo = () => {
    if (offerRewardData) {
      setShowCreateMultipleOfferReward(false);
      setShowOfferRewardCreated(true);
      localStorage.setItem(
        `${pathname === "/createoffer/app" ? "app" : "web"}single offer`,
        JSON.stringify(offerRewardData)
      );
    }
  };
  console.log("path app", pathname);
  const onYes = () => {
    console.table(offerRewardData);
    setShowCreateMultipleOfferReward(false);
    switch (pathname) {
      case "/createoffer/app":
        navigate("/createoffer/app/createduplicate", {
          state: {
            offerRewardData,
          },
        });
        break;
      case "/createoffer/web":
        navigate("/createoffer/web/createduplicate", {
          state: {
            offerRewardData,
          },
        });
        break;
      case "/createreward/app":
        navigate("/createreward/app/createduplicate", {
          state: {
            offerRewardData,
          },
        });
        break;
      case "/createreward/web":
        navigate("/createreward/web/createduplicate", {
          state: {
            offerRewardData,
          },
        });
        break;
      default:
        <></>;
    }
  };
  console.log("offerreward", offerRewardData);

  return (
    <>
      <div className="create-multiple-offers-container">
        <div className="create-multiple-offers-icon">
          <img src={CreateDuplicateIcon} alt="create-duplicate-icon" />
        </div>
        <div className="success-text">
          Create Multiple {reward ? "Rewards" : "Offers"}{" "}
        </div>
        <div className="description-text">
          Do you want to create multiple {reward ? "rewards" : "offers"}{" "}
        </div>
        <div className="create-multiple-offers-yes-no-btn">
          <div className="create-multiple-offers-no">
            <TransparentButtons buttonName="No" width="127px" onClick={onNo} />
          </div>
          <div className="create-multiple-offers-yes-btn">
            <ColorButton buttonName="Yes" width="127px" onClick={onYes} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMultipleDialog;
