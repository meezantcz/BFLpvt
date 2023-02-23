import { useState } from "react";
import ColorButton from "../ColorButton";
import TransparentButtons from "../TransparentButtons";

import "./styles.scss";

import { useLocation, useNavigate } from "react-router-dom";
import CreateDuplicateIcon from "../../Assets/Images/duplicate.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createOfferApp } from "../../redux/slice/CreateOfferSlice";
import { createOfferWeb } from "../../redux/slice/CreateOfferSlice";
import { createRewardApp } from "../../redux/slice/CreateRewardSlice";
import { createRewardWeb } from "../../redux/slice/CreateRewardSlice";
interface Props {
  offerRewardData: any;
  setShowCreateMultipleOfferReward: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setShowOfferRewardCreated: React.Dispatch<React.SetStateAction<boolean>>;
  reward?: boolean;
  offerRewardType: string;
}

const CreateMultipleDialog: React.FC<Props> = ({
  offerRewardData,
  setShowCreateMultipleOfferReward,
  setShowOfferRewardCreated,
  reward,
  offerRewardType,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const onNo = () => {
    if (offerRewardData) {
      setShowCreateMultipleOfferReward(false);
      setShowOfferRewardCreated(true);
      switch (offerRewardType) {
        case "createOfferWeb":
          const createOfferWebData: any = {};
          const postCreateOfferWebData: any = [];
          offerRewardData.map((m: any) => {
            if (m.name && m.value) {
              createOfferWebData[m.name] = m.value;
            }
          });
          createOfferWebData.offerType = "Web";
          postCreateOfferWebData.push(createOfferWebData);
          console.log(postCreateOfferWebData, "apidataOffer");

          dispatch(createOfferWeb(postCreateOfferWebData));
          break;

        case "createOfferApp":
          const createOfferAppData: any = {};
          const postCreateOfferAppData: any = [];
          offerRewardData.map((m: any) => {
            if (m.name && m.value) {
              createOfferAppData[m.name] = m.value;
            }
          });
          createOfferAppData.offerType = "App";
          postCreateOfferAppData.push(createOfferAppData);
          console.log(postCreateOfferAppData, "apidatarEWARDA");

          dispatch(createOfferApp(postCreateOfferAppData));

          break;
        case "createRewardWeb":
          const createRewardWebData: any = {};
          const postCreateRewardWebData: any = [];
          offerRewardData.map((m: any) => {
            if (m.name && m.value) {
              createRewardWebData[m.name] = m.value;
            }
          });
          createRewardWebData.type = "Web";
          postCreateRewardWebData.push(createRewardWebData);
          console.log(postCreateRewardWebData, "apidataOffer");

          dispatch(createRewardWeb(postCreateRewardWebData));
          break;
        case "createRewardApp":
          const createRewardAppData: any = {};
          const postCreateRewardAppData: any = [];
          offerRewardData.map((m: any) => {
            if (m.name && m.value) {
              createRewardAppData[m.name] = m.value;
            }
          });
          createRewardAppData.type = "App";
          postCreateRewardAppData.push(createRewardAppData);
          console.log(postCreateRewardAppData, "apidataOffer");

          dispatch(createRewardApp(postCreateRewardAppData));
          break;
        default:
          <></>;
      }
    }
  };
  console.log("path app", pathname);
  const onYes = () => {
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
    console.log("onyesssmuu", offerRewardData);
  };
  console.log("offerreward kkkkk", offerRewardData);

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
