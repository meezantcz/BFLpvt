import { useState, useEffect } from "react";
import CommonInputField from "../../Components/CommonInputField";
import CommonDropdown from "../../Components/CommonDropdown";
import BreadCrumb from "../../Components/BreadCrumb";
import "./styles.scss";
import Dialogbox from "../../Components/SuccessDialogBox";
import CreateOfferFooter from "../../Components/CreateOfferFooter";
import CreateMultipleDialog from "../../Components/CreateMultipleDialog";
import CommonDateField from "../../Components/CommonDateField";
import { useLocation, useNavigate } from "react-router-dom";
import { appOfferInputItems } from "../../data/AppOfferInpuItems";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createOfferAppDraftData } from "../../redux/slice/CreateOfferSlice";

const CreateOfferApp = () => {
  const [createOfferAppInputData, setCreateOfferAppInputData] = useState<any>(
    []
  );

  const [showCreateMultipleOffers, setShowCreateMultipleOffers] =
    useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [showOfferCreated, setShowOfferCreated] = useState<boolean>(false);

  useEffect(() => {
    if (createOfferAppInputData.length === 0) {
      setCreateOfferAppInputData([
        ...appOfferInputItems.map((item: any) => ({ ...item, isError: false })),
      ]);
    }
  }, [createOfferAppInputData]);

  const validateFields = () => {
    let isValid = true;
    createOfferAppInputData.forEach((inputData: any, index: number) => {
      if (inputData.isRequired && !inputData.value) {
        createOfferAppInputData[index].isError = true;
        isValid = false;
      } else {
        createOfferAppInputData[index].isError = false;
      }
    });

    setCreateOfferAppInputData([...createOfferAppInputData]);
    return isValid;
  };

  const onSaveDraft = () => {
    const postObjectData: any = {};
    const obj: any = [];
    createOfferAppInputData.map((m: any) => {
      if (m.name && m.value) {
        postObjectData[m.name] = m.value;
      }
    });
    postObjectData.offerType = "App";
    postObjectData.draftStatus = true;

    obj.push(postObjectData);
    console.log(obj, "apidraftdata");

    dispatch(createOfferAppDraftData(obj));
  };

  const onCreateOfferApp = () => {
    if (!validateFields()) {
      alert("fill required fields");
    } else {
      setShowCreateMultipleOffers(true);
    }
  };

  const onSuccessDialogClose = () => {
    setShowOfferCreated(false);
  };

  console.log("module", createOfferAppInputData);

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
              createOfferAppInputData[index].value = e;
              setCreateOfferAppInputData([...createOfferAppInputData]);
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
              createOfferAppInputData[index].value = e;
              setCreateOfferAppInputData([...createOfferAppInputData]);
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
              createOfferAppInputData[index].value = e;
              setCreateOfferAppInputData([...createOfferAppInputData]);
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
    if (showOfferCreated) {
      const timeoutId = setTimeout(() => {
        setShowOfferCreated(false);
        navigate("/offerlisting");
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [showOfferCreated]);

  return (
    <>
      {pathname !== "/createoffer/web-app" && (
        <BreadCrumb from="Dashboard" to="Create Offer" />
      )}
      <div className="create-offer-display-app">
        {pathname !== "/createoffer/web-app" && (
          <div className="heading1">
            Create Offer
            <hr></hr>
          </div>
        )}

        <div className="create-app-inputs">
          {createOfferAppInputData.map((m: any, index: number) => (
            <div className="create-app-offer-items">
              {renderInputFields(m, index)}
            </div>
          ))}
        </div>
      </div>
      <CreateOfferFooter
        onSaveDraft={onSaveDraft}
        onCreate={onCreateOfferApp}
      />
      {showCreateMultipleOffers && (
        <CreateMultipleDialog
          offerRewardData={createOfferAppInputData}
          setShowCreateMultipleOfferReward={setShowCreateMultipleOffers}
          setShowOfferRewardCreated={setShowOfferCreated}
          offerRewardType="createOfferApp"
        />
      )}
      {showOfferCreated && (
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

export default CreateOfferApp;
