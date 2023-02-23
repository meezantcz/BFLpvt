import { useState, useEffect } from "react";
import React from "react";
import CommonInputField from "../../Components/CommonInputField";
import CommonDropdown from "../../Components/CommonDropdown";
import BreadCrumb from "../../Components/BreadCrumb";
import "./styles.scss";
import Dialogbox from "../../Components/SuccessDialogBox";

import CreateOfferFooter from "../../Components/CreateOfferFooter";
import CreateMultipleDialog from "../../Components/CreateMultipleDialog";
import { useLocation, useNavigate } from "react-router-dom";
import CommonDateField from "../../Components/CommonDateField";
import { webRewardInputItems } from "../../data/WebRewardInputItems";
import { useDispatch } from "react-redux";
import { createRewardWebDraftData } from "../../redux/slice/CreateRewardSlice";
import { AppDispatch } from "../../redux/store";
const CreateRewardWeb = () => {
  const [showCreateMultipleRewards, setShowCreateMultipleRewards] =
    useState<boolean>(false);

  const [createRewardWebInputData, setCreateRewardWebInputData] = useState<any>(
    []
  );
  const [showRewardCreated, setShowRewardCreated] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (createRewardWebInputData.length === 0) {
      setCreateRewardWebInputData([
        ...webRewardInputItems.map((item: any) => ({
          ...item,
          isError: false,
        })),
      ]);
    }
  }, [createRewardWebInputData]);

  const validateFields = () => {
    let isValid = true;
    createRewardWebInputData.forEach((inputData: any, index: number) => {
      if (
        inputData.isRequired &&
        (!inputData.value || inputData.value === "Select")
      ) {
        createRewardWebInputData[index].isError = true;
        isValid = false;
      } else {
        createRewardWebInputData[index].isError = false;
      }
    });

    setCreateRewardWebInputData([...createRewardWebInputData]);
    return isValid;
  };

  const onCreateRewardWeb = () => {
    if (!validateFields()) {
      alert("fill required fields");
    } else {
      setShowCreateMultipleRewards(true);
    }
  };

  const onSaveDraft = () => {
    const postObjectData: any = {};
    const obj: any = [];
    createRewardWebInputData.map((m: any) => {
      if (m.name && m.value) {
        postObjectData[m.name] = m.value;
      }
    });
    postObjectData.type = "Web";

    postObjectData.draftStatus = true;

    obj.push(postObjectData);
    console.log(obj, "apidraftdata");

    dispatch(createRewardWebDraftData(obj));
  };

  const onSuccessDialogClose = () => {
    setShowRewardCreated(false);
  };

  useEffect(() => {
    if (showRewardCreated) {
      const timeoutId = setTimeout(() => {
        setShowRewardCreated(false);
        navigate("/offerlisting");
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [showRewardCreated]);

  const renderInputFields = (m: any, index: number) => {
    switch (m.type) {
      case "string":
        return (
          <CommonInputField
            isRequired={m.isRequired}
            name={m.label}
            placeholder="Enter Here"
            value={m.value}
            setValue={(e) => {
              createRewardWebInputData[index].value = e;
              setCreateRewardWebInputData([...createRewardWebInputData]);
            }}
            width="275px"
            margin="0px"
            type="string"
            isError={m.isError}
          />
        );
        break;
      case "dropdown":
        return (
          <CommonDropdown
            DropdownName={m.label}
            isRequired={m.isRequired}
            selected={m.value}
            setSelected={(e) => {
              createRewardWebInputData[index].value = e;
              setCreateRewardWebInputData([...createRewardWebInputData]);
            }}
            options={m.options}
            width="275px"
            paddingBottom="0px"
            isError={m.isError}
          />
        );
        break;
      case "Date":
        return (
          <CommonDateField
            inputName={m.label}
            date={m.value}
            setDate={(e) => {
              createRewardWebInputData[index].value = e;
              setCreateRewardWebInputData([...createRewardWebInputData]);
            }}
            isError={m.isError}
            isRequired={m.isRequired}
          />
        );
        break;

      default:
        <></>;
    }
  };

  return (
    <>
      <BreadCrumb from="Dashboard" to="Create Reward" />

      <div className="create-reward-display-web">
        <div className="heading1">
          Create Reward
          <hr></hr>
        </div>

        <div className="create-web-inputs">
          {createRewardWebInputData.map((m: any, index: number) => (
            <div className="create-web-offer-items">
              {renderInputFields(m, index)}
            </div>
          ))}
        </div>
      </div>

      {showRewardCreated && (
        <div className="offer-created-component">
          <Dialogbox
            mainText="Rewards Created Successfully"
            subText="Lorem Ipsum has been the industry's standard dummy"
            onDialogClose={onSuccessDialogClose}
          />
        </div>
      )}
      <CreateOfferFooter
        onCreate={onCreateRewardWeb}
        onSaveDraft={onSaveDraft}
      />

      {showCreateMultipleRewards && (
        <CreateMultipleDialog
          offerRewardData={createRewardWebInputData}
          setShowCreateMultipleOfferReward={setShowCreateMultipleRewards}
          setShowOfferRewardCreated={setShowRewardCreated}
          offerRewardType="createRewardWeb"
          reward={true}
        />
      )}
    </>
  );
};

export default CreateRewardWeb;
