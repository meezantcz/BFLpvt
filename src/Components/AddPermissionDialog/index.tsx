import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import CheckboxDropdown from "../CheckboxDropdown";
import CommonInputField from "../CommonInputField";
import DialogButton from "../DialogButton";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { ADD_PERMISSION } from "../../redux/slice/AllPermissionSlice";
import "./styles.scss";

interface Props {
  onAddPermissionDialogClose: () => void;
  setShowAddPermission: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPermissionCreatedDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

let ModelOptions: string[];
ModelOptions = ["Web", "App", "Both"];

let ModuleOptions: string[];
ModuleOptions = [
  "All",
  "Create Offer",
  "Create Reward",
  "User Management",
  "Activity Management",
  "Bulk Upload",
  "Geneare Excel",
  "Moderation",
];

let BusinessCategoryOptions: string[];
BusinessCategoryOptions = ["All", "Personal Load", "Credit Card"];

let AddGroupsOptions: string[];
AddGroupsOptions = ["Group 1", "Group 2"];

const AddPermissionDialog: React.FC<Props> = ({
  onAddPermissionDialogClose,
  setShowAddPermission,
  setShowPermissionCreatedDialog,
}) => {
  const [permissionName, setPermissionName] = useState<string>("");
  const [selectModel, setSelectModel] = useState<string>("Select");
  const [selectModule, setSelectModule] = useState<string>("Select");
  const [selectBusinessCategory, setSelectBusinessCategory] =
    useState<string>("Select");
  const [selectGroup, setSelectGroup] = useState<string>("Select");
  const dispatch = useDispatch();

  const onAddPermission = () => {
    if (
      permissionName &&
      selectModel &&
      selectModule &&
      selectBusinessCategory &&
      selectGroup
    ) {
      dispatch(
        ADD_PERMISSION({
          id: nanoid(),
          name: permissionName,
          totalGroup: selectGroup,
          permissionId: nanoid(),
          date: `${new Date().getDate()} ${new Intl.DateTimeFormat("en-US", {
            month: "long",
          }).format(new Date())} ${new Date().getFullYear()}`,
          actions: "edit,delete",
        })
      );
      setShowAddPermission(false);
      setShowPermissionCreatedDialog(true);
    }
  };

  return (
    <div className="add-permission-container">
      <div className="add-permission-header">
        <div className="add-permission-heading">permission User</div>
        <div
          className="add-permission-cross-icon"
          onClick={onAddPermissionDialogClose}
        >
          <RxCross2 />
        </div>
      </div>
      <div className="add-permission-hr">
        <hr />
      </div>
      <div className="add-permission-input-container">
        <div className="add-permission-input">
          <CommonInputField
            name="Permission Name"
            type="string"
            placeholder="Enter Here"
            value={permissionName}
            setValue={setPermissionName}
            isRequired={true}
            width="418px"
            margin="10px"
          />
        </div>
        <div className="add-permission-dropdown">
          <CheckboxDropdown
            DropdownName="Select Model"
            isRequired={true}
            width="204px"
            selected={selectModel}
            setSelected={setSelectModel}
            options={ModelOptions}
            paddingBottom="5px"
          />
        </div>
        <div className="add-permission-dropdown">
          <CheckboxDropdown
            DropdownName="Select Module"
            isRequired={true}
            width="204px"
            selected={selectModule}
            setSelected={setSelectModule}
            options={ModuleOptions}
            paddingBottom="5px"
          />
        </div>
        <div className="add-permission-dropdown">
          <CheckboxDropdown
            DropdownName="Business Category"
            isRequired={true}
            width="204px"
            selected={selectBusinessCategory}
            setSelected={setSelectBusinessCategory}
            options={BusinessCategoryOptions}
            paddingBottom="5px"
          />
        </div>
        <div className="add-permission-input-add-group">
          <CheckboxDropdown
            DropdownName="Add Groups"
            isRequired={true}
            width="204px"
            selected={selectGroup}
            setSelected={setSelectGroup}
            options={AddGroupsOptions}
            paddingBottom="5px"
          />
        </div>
      </div>
      <div className="add-permission-dialog-btn">
        <DialogButton
          buttonName="Add"
          onDialogButtonClick={onAddPermission}
          width="418px"
        />
      </div>
    </div>
  );
};

export default AddPermissionDialog;
