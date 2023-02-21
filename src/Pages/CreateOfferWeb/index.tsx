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
import { webOfferInputItems } from "../../data/WebOfferInputItems";

const CreateOfferWeb = () => {
  const [showCreateMultipleOffers, setShowCreateMultipleOffers] =
    useState<boolean>(false);

  const [createOfferWebInputData, setCreateOfferWebInputData] = useState<any>(
    []
  );
  // ...webInputItems.map((item) => ({ ...item, isError: false })),
  const [createButtonActive, setCreateButtonActive] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (createOfferWebInputData.length === 0) {
      setCreateOfferWebInputData([
        ...webOfferInputItems.map((item: any) => ({
          ...item,
          isError: false,
          isValid: null,
        })),
      ]);
    }
  }, [createOfferWebInputData]);

  const validateFields = () => {
    let isValid = true;
    createOfferWebInputData.forEach((inputData: any, index: number) => {
      if (inputData.isValid) {
        createOfferWebInputData[index].isError = true;
        createOfferWebInputData[index].isValid = false;
        isValid = false;
      } else if (
        inputData.isRequired &&
        (!inputData.value || inputData.value === "Select")
      ) {
        createOfferWebInputData[index].isError = true;
        isValid = false;
      } else {
        createOfferWebInputData[index].isError = false;
      }
    });

    setCreateOfferWebInputData([...createOfferWebInputData]);
    return isValid;
  };

  const onCreateOfferWeb = () => {
    setCreateButtonActive(true);
    console.table(createOfferWebInputData);
    if (!validateFields()) {
      alert("fill required fields");
    } else {
      setShowCreateMultipleOffers(true);
    }
  };

  const { pathname } = useLocation();

  const [showOfferCreated, setShowOfferCreated] = useState<boolean>(false);
  const onSuccessDialogClose = () => {
    setShowOfferCreated(false);
  };

  const checkRegex = (inputValue: any, m: any) => {
    switch (m.regexId) {
      case 1:
        console.log("regextest for 1", m.regex.test(inputValue));
        if (!m.regex.test(inputValue)) {
          m.isValid = true;
          m.isError = true;
        } else {
          m.isValid = false;
          m.isError = false;
        }
        break;
      case 2:
        console.log("regextest for 2 unique number", m.regex.test(inputValue));
        if (!m.regex.test(inputValue)) {
          m.isValid = true;
          m.isError = true;
        } else {
          m.isValid = false;
          m.isError = false;
        }
        console.log("isvalid", m.isValid);
        break;
      case 3:
        console.log("regextest for 3", m.regex.test(inputValue));
        if (!m.regex.test(inputValue)) {
          m.isValid = true;
          m.isError = true;
        } else {
          m.isValid = false;
          m.isError = false;
        }
        break;
      case 4:
        console.log("regextest for 4", m.regex.test(inputValue));
        if (!m.regex.test(inputValue)) {
          m.isValid = true;
          m.isError = true;
        } else {
          m.isValid = false;
          m.isError = false;
        }
        break;
      case 5:
        console.log("regextest for 5", m.regex.test(inputValue));
        if (!m.regex.test(inputValue)) {
          m.isValid = true;
          m.isError = true;
        } else {
          m.isValid = false;
          m.isError = false;
        }
        break;

      case 6:
        console.log("regextest for 6", m.regex.test(inputValue));
        if (!m.regex.test(inputValue)) {
          m.isValid = true;
          m.isError = true;
        } else {
          m.isValid = false;
          m.isError = false;
        }

        break;
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

  const renderInputFields = (m: any, index: number) => {
    switch (m.type) {
      case "string":
        return (
          <>
            <CommonInputField
              isRequired={m.isRequired}
              name={m.label}
              placeholder="Enter Here"
              value={m.value}
              setValue={(e) => {
                checkRegex(e, m);

                createOfferWebInputData[index].value = e;
                setCreateOfferWebInputData([...createOfferWebInputData]);
              }}
              width="275px"
              margin="0px"
              type={m.type === "number" ? Number : "string"}
              isError={m.isError}
              maxlength={m.maxlength}
            />
            {m.isValid && (
              <div className="expected-value">{m.label} is not valid</div>
            )}
            {createButtonActive && m.isError && !m.value && (
              <div className="expected-value">{m.label} is expected</div>
            )}
          </>
        );
        break;
      case "number":
        return (
          <>
            <CommonInputField
              isRequired={m.isRequired}
              name={m.label}
              placeholder="Enter Here"
              value={m.value}
              setValue={(e) => {
                checkRegex(e, m);

                createOfferWebInputData[index].value = e;
                setCreateOfferWebInputData([...createOfferWebInputData]);
              }}
              width="275px"
              margin="0px"
              type="number"
              isError={m.isError}
              maxlength={m.maxlength}
            />

            {createButtonActive && m.isError && !m.value && m.isRequired && (
              <div className="expected-value">{m.label} is expected</div>
            )}
            {m.isValid && (
              <div className="expected-value">{m.label} is not valid</div>
            )}
          </>
        );
        break;
      case "dropdown":
        return (
          <>
            <CommonDropdown
              DropdownName={m.label}
              isRequired={m.isRequired}
              selected={m.value}
              setSelected={(e) => {
                createOfferWebInputData[index].value = e;
                setCreateOfferWebInputData([...createOfferWebInputData]);
              }}
              options={m.options}
              width="275px"
              paddingBottom="0px"
              isError={m.isError}
            />
            {createButtonActive && m.isError && m.value === "Select" && (
              <div className="expected-value">{m.label} is expected</div>
            )}
          </>
        );
        break;
      case "Date":
        return (
          <>
            <CommonDateField
              inputName={m.label}
              date={m.value}
              setDate={(e) => {
                createOfferWebInputData[index].value = e;
                setCreateOfferWebInputData([...createOfferWebInputData]);
              }}
              isError={m.isError}
              isRequired={m.isRequired}
            />
            {createButtonActive && m.isError && !m.value && (
              <div className="expected-value">{m.label} is expected</div>
            )}
          </>
        );
        break;

      default:
        <></>;
    }
  };

  return (
    <>
      {pathname !== "/createoffer/web-app" && (
        <BreadCrumb from="Dashboard" to="Create Offer" />
      )}

      <div className="create-offer-display-web">
        {pathname !== "/createoffer/web-app" && (
          <div className="heading1">
            Create Offer
            <hr></hr>
          </div>
        )}

        <div className="create-web-inputs">
          {createOfferWebInputData.map((m: any, index: number) => (
            <div className="create-web-offer-items">
              {renderInputFields(m, index)}
            </div>
          ))}
        </div>
      </div>

      {showOfferCreated && (
        <div className="offer-created-component">
          <Dialogbox
            mainText="Offers Created Successfully"
            subText="Lorem Ipsum has been the industry's standard dummy"
            onDialogClose={onSuccessDialogClose}
          />
        </div>
      )}
      <CreateOfferFooter
        onCreate={onCreateOfferWeb}
        onSaveDraft={onCreateOfferWeb}
      />

      {showCreateMultipleOffers && (
        <CreateMultipleDialog
          offerRewardData={createOfferWebInputData}
          setShowCreateMultipleOfferReward={setShowCreateMultipleOffers}
          setShowOfferRewardCreated={setShowOfferCreated}
        />
      )}
    </>
  );
};

export default CreateOfferWeb;
