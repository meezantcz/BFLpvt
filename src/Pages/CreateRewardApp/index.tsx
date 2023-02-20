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
import { appRewardInputItems } from "../../data/AppRewardInputItems";
const CreateRewardApp = () => {
  const [createRewardAppInputData, setCreateRewardAppInputData] = useState<any>(
    []
  );
  const [showCreateMultipleRewards, setShowCreateMultipleRewards] =
    useState<boolean>(false);
  const [showRewardCreated, setShowOfferCreated] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (createRewardAppInputData.length === 0) {
      setCreateRewardAppInputData([
        ...appRewardInputItems.map((item: any) => ({
          ...item,
          isError: false,
        })),
      ]);
    }
  }, [createRewardAppInputData]);

  const validateFields = () => {
    let isValid = true;
    createRewardAppInputData.forEach((inputData: any, index: number) => {
      if (inputData.isRequired && !inputData.value) {
        createRewardAppInputData[index].isError = true;
        isValid = false;
      } else {
        createRewardAppInputData[index].isError = false;
      }
    });

    setCreateRewardAppInputData([...createRewardAppInputData]);
    return isValid;
  };

  const onCreateOfferApp = () => {
    if (!validateFields()) {
      alert("fill required fields");
    } else {
      setShowCreateMultipleRewards(true);
    }
  };

  const onSuccessDialogClose = () => {
    setShowOfferCreated(false);
  };

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
              createRewardAppInputData[index].value = e;
              setCreateRewardAppInputData([...createRewardAppInputData]);
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
            isRequired={false}
            selected={m.value}
            setSelected={(e) => {
              createRewardAppInputData[index].value = e;
              setCreateRewardAppInputData([...createRewardAppInputData]);
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
              createRewardAppInputData[index].value = e;
              setCreateRewardAppInputData([...createRewardAppInputData]);
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

  useEffect(() => {
    if (showRewardCreated) {
      const timeoutId = setTimeout(() => {
        setShowOfferCreated(false);
        navigate("/offerlisting");
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [showRewardCreated]);

  return (
    <>
      {pathname !== "/createoffer/web-app" && (
        <BreadCrumb from="Dashboard" to="Create Offer" />
      )}
      <div className="create-offer-display-app">
        {pathname !== "/createoffer/web-app" && (
          <div className="heading1">
            Create Reward
            <hr></hr>
          </div>
        )}

        <div className="create-app-inputs">
          {createRewardAppInputData.map((m: any, index: number) => (
            <div className="create-app-offer-items">
              {renderInputFields(m, index)}
            </div>
          ))}
        </div>
      </div>
      <CreateOfferFooter
        onSaveDraft={onCreateOfferApp}
        onCreate={onCreateOfferApp}
      />
      {showCreateMultipleRewards && (
        <CreateMultipleDialog
          offerRewardData={createRewardAppInputData}
          setShowCreateMultipleOfferReward={setShowCreateMultipleRewards}
          setShowOfferRewardCreated={setShowOfferCreated}
          reward={true}
        />
      )}
      {showRewardCreated && (
        <div className="offers-created-dialog">
          <Dialogbox
            mainText="Offers Created Successfully"
            subText="lorem iposum lorem ipsum lorem ipsim"
            onDialogClose={onSuccessDialogClose}
          />
        </div>
      )}
    </>
  );
};

export default CreateRewardApp;
