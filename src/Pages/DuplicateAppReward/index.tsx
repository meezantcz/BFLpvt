import React, { useState, useEffect } from "react";
import BreadCrumb from "../../Components/BreadCrumb";
import ColorButton from "../../Components/ColorButton";
import ToggleButton from "../../Components/ToggleButton";
import TransparentButtons from "../../Components/TransparentButtons";
import PlusIcon from "../../Assets/Images/createduplicateplus.svg";
import SuccessDialogbox from "../../Components/SuccessDialogBox";
import { appRewardInputItems } from "../../data/AppRewardInputItems";
import CardSliderComponent from "../DuplicateWebOffer/CardSlider/CardSliderComponent";
import { useLocation, useNavigate } from "react-router-dom";

const DuplicateAppReward = () => {
  const [boxes, setBoxes] = useState<any>([
    { itemIndex: 0, items: [...appRewardInputItems] },
  ]);
  const [showSuccessDialogBox, setShowSuccessDialogBox] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.table(location.state);
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
    localStorage.setItem("multiple app rewards draft", JSON.stringify(boxes));
    appRewardInputItems.forEach((item) => {
      item.value = "";
    });
  };

  const onSubmit = () => {
    localStorage.setItem("multiple web rewards submit", JSON.stringify(boxes));

    setShowSuccessDialogBox(true);
    appRewardInputItems.forEach((item) => {
      item.value = "";
    });

    setTimeout(() => {
      setShowSuccessDialogBox(false);

      navigate("/offerlisting");
      appRewardInputItems.forEach((item) => {
        if (item.type === "dropdown") {
          item.value = "Select";
        } else {
          item.value = "";
        }
      });
    }, 5000);
  };

  const onCreateDuplicate = () => {
    const offerList = {
      itemIndex: boxes.length,
      // items: JSON.parse(JSON.stringify([...location.state.createOfferData])),
      items: location.state.offerRewardData.map((item: any) => ({ ...item })),
    };
    // console.table(
    //   JSON.parse(JSON.stringify([...location.state.createOfferData]))
    // );
    boxes.push(offerList);
    setBoxes([...boxes]);
  };

  const handleLeftArrow = () => {};

  const handleRightArrow = () => {};
  const handleDelete = (index: number) => {
    console.log("delet index", index);
    const newBoxes = boxes.filter((_: any, i: any) => i !== index);
    setBoxes(newBoxes);
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
        {boxes.map((m: any) => {
          return (
            <CardSliderComponent
              key={m.itemIndex}
              parentIndex={m.itemIndex}
              handleRightArrow={handleRightArrow}
              handleLeftArrow={handleLeftArrow}
              boxesItems={m.items || []}
              setValuesInput={(inputValueArray: any, parentIndex: number) => {
                boxes[parentIndex].items = inputValueArray;
                setBoxes([...boxes]);
              }}
              onHandleClick={handleDelete}
            />
          );
        })}
        <div className="create-duplicate-btn" onClick={onCreateDuplicate}>
          <span className="create-duplicate-plus-icon">
            <img src={PlusIcon} alt="+icon" />
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
          mainText="Rewards Created Successfully"
          subText="lorem ipsum lorem ipsum lorem"
          onDialogClose={onSuccessDialogClose}
        />
      )}
    </>
  );
};

export default DuplicateAppReward;
