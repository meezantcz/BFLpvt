import React, { useState, useEffect } from "react";
import BreadCrumb from "../../Components/BreadCrumb";
import ColorButton from "../../Components/ColorButton";
import ToggleButton from "../../Components/ToggleButton";
import TransparentButtons from "../../Components/TransparentButtons";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./styles.scss";
import SuccessDialogbox from "../../Components/SuccessDialogBox";
import { appOfferInputItems } from "../../data/AppOfferInpuItems";
import CardSliderComponent from "../DuplicateWebOffer/CardSlider/CardSliderComponent";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createDuplicateAppOffer } from "../../redux/slice/CreateOfferSlice";
import { createMultipleOfferAppDraftData } from "../../redux/slice/CreateOfferSlice";

const DuplicateAppOffer = () => {
  const [boxes, setBoxes] = useState<any>([
    { itemIndex: 0, items: [...appOfferInputItems] },
  ]);

  const [showSuccessDialogBox, setShowSuccessDialogBox] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(location.state);
    console.log("inside useEffect app");
    if (
      Array.isArray(location.state.offerRewardData) &&
      location.state.offerRewardData.length > 0
    ) {
      setBoxes([{ itemIndex: 0, items: [...location.state.offerRewardData] }]);
    }
  }, [location]);

  const handleToggle = (isOn: boolean) => {
    console.log(`Toggled to: ${isOn}`);
  };

  const onSaveDraft = () => {
    const apiData: any = boxes.map((box: any) => {
      const boxData: any = {};
      box.items.forEach((item: any) => {
        if (item.value) {
          boxData[item.name] = item.value;
          boxData.offerType = "App";
          boxData.draftStatus = true;
        }
      });

      return boxData;
    });
    dispatch(createMultipleOfferAppDraftData(apiData));
  };

  const onSubmit = () => {
    const apiData: any = boxes.map((box: any) => {
      const boxData: any = {};
      box.items.forEach((item: any) => {
        if (item.value) {
          boxData[item.name] = item.value;
          boxData.offerType = "App";
        }
      });

      return boxData;
    });

    dispatch(createDuplicateAppOffer(apiData));

    setShowSuccessDialogBox(true);

    setTimeout(() => {
      setShowSuccessDialogBox(false);

      navigate("/offerlisting");
    }, 5000);
  };

  const handleLeftArrow = () => {};

  const handleRightArrow = () => {};

  const handleDelete = (index: number) => {
    console.log("delet index", index);
    const newBoxes = boxes.filter((_: any, i: any) => i !== index);
    setBoxes(newBoxes);
  };

  const onCreateDuplicate = () => {
    const offerList = {
      itemIndex: boxes.length,
      // items: JSON.parse(JSON.stringify([...location.state.offerRewardData])),
      items: location.state.offerRewardData.map((item: any) => ({ ...item })),
    };
    // console.table(
    //   JSON.parse(JSON.stringify([...location.state.offerRewardData]))
    // );
    boxes.push(offerList);
    setBoxes([...boxes]);
  };

  const onSuccessDialogClose = () => {
    setShowSuccessDialogBox(false);
    navigate("/offerlisting");
  };

  return (
    <>
      <BreadCrumb from="Dashboard" to="Create Offer" />
      <div className="create-duplicate-offer-display">
        <div className="create-duplicate-offer-data-container">
          <div className="create-duplicate-offer-heading">
            <span className="create-duplicate-offer-title">
              Create Duplicate
            </span>
          </div>
          <div className="auto-save-btn">
            <ToggleButton />
          </div>
        </div>
        {boxes.map((m: any) => (
          <CardSliderComponent
            key={m.itemIndex}
            parentIndex={m.itemIndex}
            handleRightArrow={handleRightArrow}
            handleLeftArrow={handleLeftArrow}
            boxesItems={m.items || []}
            setValuesInput={(inputValueArray: any, parentIndex: number) => {
              console.log(boxes, " QUEEN");

              boxes[parentIndex].items = inputValueArray;

              setBoxes([...boxes]);
            }}
            onHandleClick={handleDelete}
          />
        ))}
        <div className="create-duplicate-btn" onClick={onCreateDuplicate}>
          <span className="create-duplicate-plus-icon">
            <AiOutlinePlusCircle color="orange" />
          </span>
          <span className="create-duplicate-btn-name">Create Duplicate</span>
        </div>
        <div className="create-duplicate-offer-btns">
          <TransparentButtons
            buttonName="Save to Draft"
            width="140px"
            onClick={onSaveDraft}
          />
          <ColorButton buttonName="Submit" width="140px" onClick={onSubmit} />
        </div>
      </div>
      {showSuccessDialogBox && (
        <SuccessDialogbox
          mainText="Offers Created Successfully"
          subText="lorem ipsum lorem ipsum lorem"
          onDialogClose={onSuccessDialogClose}
        />
      )}
    </>
  );
};

export default DuplicateAppOffer;
