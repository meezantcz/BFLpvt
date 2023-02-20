import { useState, useEffect } from "react";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { RxCross2 } from "react-icons/rx";
import CommonInputField from "../CommonInputField";
import CommonDropdown from "../CommonDropdown";
import DialogButton from "../DialogButton";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { ADD_GROUP } from "../../redux/slice/AllGroupSlice";
import { ADD_PERMISSION } from "../../redux/slice/AllPermissionSlice";

interface Props {
  dialogName: string;
  inputField1: string;
  inputValue1: string;
  inputSetValue1: React.Dispatch<React.SetStateAction<string>>;
  inputField2: string;
  inputValue2: string;
  inputSetValue2: React.Dispatch<React.SetStateAction<string>>;
  inputDropdown: string;
  buttonName: string;
  onClose: () => void;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  showInputDialogBox: boolean;
  setShowInputDialogBox: React.Dispatch<React.SetStateAction<boolean>>;

  setShowSuccessDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputDialog: React.FC<Props> = ({
  dialogName,
  onClose,
  inputField1,
  inputValue1,
  inputSetValue1,
  inputField2,
  inputValue2,
  inputSetValue2,
  inputDropdown,
  buttonName,
  selected,
  setSelected,
  options,
  showInputDialogBox,
  setShowInputDialogBox,

  setShowSuccessDialog,
}) => {
  console.log(
    "redux group state",
    useSelector((state: RootState) => state.allgroup.AllGroup)
  );
  console.log(
    "redux permission state",
    useSelector((state: RootState) => state.allpermission.AllPermission)
  );
  const dispatch = useDispatch();
  const handleCreateGroup = () => {
    if (inputValue1 && inputValue2 && selected) {
      dialogName === "Create Group"
        ? dispatch(
            ADD_GROUP({
              id: nanoid(),
              name: inputValue1,
              totalUsers: inputValue2,
              permissionGiven: selected,
              date: `${new Date().getDate()} ${new Intl.DateTimeFormat(
                "en-US",
                {
                  month: "long",
                }
              ).format(new Date())} ${new Date().getFullYear()}`,
              actions: "edit,delete",
            })
          )
        : dispatch(
            ADD_PERMISSION({
              id: nanoid(),
              name: inputValue1,
              totalGroup: inputValue2,
              permissionId: selected,
              date: `${new Date().getDate()} ${new Intl.DateTimeFormat(
                "en-US",
                {
                  month: "long",
                }
              ).format(new Date())} ${new Date().getFullYear()}`,
              actions: "edit,delete",
            })
          );
      setShowInputDialogBox(false);
      setShowSuccessDialog(true);
    }
  };

  useEffect(() => {
    inputSetValue1("");
    inputSetValue2("");
    setSelected("Select");
  }, [showInputDialogBox]);

  return (
    <div className="input-dialog-container">
      <div className="input-dialog-header">
        <div className="input-heading">
          <b>{dialogName}</b>
        </div>
        <div className="input-dialog-cross-icon" onClick={onClose}>
          <RxCross2 />
        </div>
      </div>
      <div className="input-dialog-hr">
        <hr />
      </div>
      <div className="dialog-inputs">
        <div className="input-dialog">
          <CommonInputField
            name={inputField1}
            isRequired={true}
            type="string"
            placeholder="Enter here"
            value={inputValue1}
            setValue={inputSetValue1}
            margin="10px"
            width="340px"
          />
        </div>
        <div className="input-dialog">
          <CommonInputField
            name={inputField2}
            isRequired={true}
            type="string"
            placeholder="Enter here"
            setValue={inputSetValue2}
            value={inputValue2}
            margin="10px"
            width="340px"
          />
        </div>
        <div className="input-dialog-dropdown">
          <CommonDropdown
            DropdownName={inputDropdown}
            isRequired={true}
            width="340px"
            selected={selected}
            setSelected={setSelected}
            options={options}
            paddingBottom="5px"
          />
        </div>
        <div className="input-dialog-btn">
          <DialogButton
            buttonName={buttonName}
            onDialogButtonClick={handleCreateGroup}
            width="300px"
          />
        </div>
      </div>
    </div>
  );
};

export default InputDialog;
