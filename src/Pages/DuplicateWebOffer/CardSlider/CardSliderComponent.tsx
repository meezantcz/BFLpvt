import React, { useState } from "react";
import CommonDateField from "../../../Components/CommonDateField";
import CommonDropdown from "../../../Components/CommonDropdown";
import CommonInputField from "../../../Components/CommonInputField";
import LeftArrow from "../../../Assets/Images/leftarrowduplicate.svg";
import RightArrow from "../../../Assets/Images/rightarrowduplicate.svg";
import DeleteIcon from "../../../Assets/Images/deletewhite.png";

import "../styles.scss";

interface Props {
  boxesItems: any;
  setValuesInput: any;
  parentIndex: number;
  handleLeftArrow: () => void;
  handleRightArrow: () => void;

  onHandleClick: any;
}

const CardSliderComponent: React.FC<Props> = ({
  boxesItems,
  setValuesInput,
  parentIndex,
  handleLeftArrow,
  handleRightArrow,

  onHandleClick,
}) => {
  const [selected, setSelected] = useState<{ index: number; value: any }>({
    index: -1,
    value: null,
  });

  const renderInputFields = (m: any, index: number) => {
    if (selected.index === index) {
      switch (m.type) {
        case "string":
          return (
            <CommonInputField
              rightSpace={true}
              isRequired={m.isRequired}
              name={m.label}
              placeholder=""
              value={selected.value}
              setValue={(e) => {
                const newBoxesItems = [...boxesItems];
                newBoxesItems[index].value = e;
                setValuesInput(newBoxesItems, parentIndex);
                setSelected({ index: index, value: e });
              }}
              width="200px"
              margin="0px"
              type="string"
            />
          );
        case "dropdown":
          return (
            <CommonDropdown
              rightSpace={true}
              DropdownName={m.label}
              isRequired={m.isRequired}
              selected={selected.value}
              setSelected={(e) => {
                const newBoxesItems = [...boxesItems];
                newBoxesItems[index].value = e;
                setValuesInput(newBoxesItems, parentIndex);
                setSelected({ index: index, value: e });
              }}
              width="200px"
              paddingBottom="0px"
              options={m.options}
            />
          );
        case "Date":
          return (
            <CommonDateField
              rightSpace={true}
              inputName={m.label}
              date={selected.value}
              setDate={(e) => {
                const newBoxesItems = [...boxesItems];
                newBoxesItems[index].value = e;
                setValuesInput(newBoxesItems, parentIndex);
                setSelected({ index: index, value: e });
              }}
              isRequired={m.isRequired}
            />
          );
        default:
          return <></>;
      }
    } else {
      return (
        <div
          className="create-duplicate-label-value-container"
          onClick={() => setSelected({ index: index, value: m.value })}
        >
          <div
            className={`create-duplicate-label ${
              m.isRequired ? "required-label" : ""
            }`}
          >
            {m.label}
          </div>
          <div className="create-duplicate-value">
            {m.type === "Date" ? m.value.toLocaleString() : m.value}
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="create-duplicate-fields-container">
        {parentIndex === 0 && (
          <img
            src={LeftArrow}
            alt="left-arrow"
            className="create-duplicate-arrow-left"
            onClick={handleLeftArrow}
          />
        )}
        <div className="create-duplicate-fields-item-container">
          {boxesItems.map((m: any, index: number) => (
            <div
              className={`create-duplicate-field ${
                m.type === "Date" ? "date-width" : "defined-width"
              }`}
            >
              <div className="create-duplicate-field-inner">
                {renderInputFields(m, index)}
              </div>
            </div>
          ))}
        </div>

        {parentIndex === 0 ? (
          <img
            src={RightArrow}
            alt="right-arrow"
            className="create-duplicate-arrow-right"
            onClick={handleRightArrow}
          />
        ) : (
          <span className="create-duplicate-delete-icon">
            <img
              src={DeleteIcon}
              alt="delete-icon-duplicate"
              onClick={() => onHandleClick(parentIndex)}
              className="delete-duplicate-icon"
              color="white"
            />
          </span>
        )}
      </div>
    </>
  );
};

export default CardSliderComponent;
