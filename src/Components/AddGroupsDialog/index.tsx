import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import CommonInputField from "../CommonInputField";
import CommonDropdown from "../CommonDropdown";
import DialogButton from "../DialogButton";
import { ADD_GROUP } from "../../redux/slice/AllGroupSlice";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

interface Props {
  onCreateGroupClose: () => void;
  setShowCreateGroup: React.Dispatch<React.SetStateAction<boolean>>;
  setShowGroupCreatedDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

let PermissionOptions: string[];
PermissionOptions = ["Administration", "Content Access"];

const AddGroupDialog: React.FC<Props> = ({
  onCreateGroupClose,
  setShowCreateGroup,
  setShowGroupCreatedDialog,
}) => {
  const [groupName, setGroupName] = useState<string>("");
  const [addUser, setAddUser] = useState<string>("");
  const [selectPermission, setSelectPermission] = useState<string>("Select");
  const dispatch = useDispatch();

  const onCreateGroup = () => {
    if (groupName && addUser && selectPermission) {
      dispatch(
        ADD_GROUP({
          id: nanoid(),
          name: groupName,
          totalUsers: addUser,
          permissionGiven: selectPermission,
          date: `${new Date().getDate()} ${new Intl.DateTimeFormat("en-US", {
            month: "long",
          }).format(new Date())} ${new Date().getFullYear()}`,
          actions: "edit,delete",
        })
      );
      setShowCreateGroup(false);
      setShowGroupCreatedDialog(true);
    }
  };

  return (
    <div className="add-group-dialog-container">
      <div className="add-group-dialog-header">
        <div className="add-group-heading">Create Group</div>
        <div
          className="add-group-dialog-cross-icon"
          onClick={onCreateGroupClose}
        >
          <RxCross2 />
        </div>
      </div>
      <div className="add-group-dialog-hr">
        <hr />
      </div>
      <div className="add-group-inputs">
        <div className="add-group-input-dialog">
          <CommonInputField
            name="Group Name"
            isRequired={true}
            type="string"
            placeholder="Enter here"
            value={groupName}
            setValue={setGroupName}
            margin="10px"
            width="340px"
          />
        </div>
        <div className="add-group-input-dialog">
          <CommonInputField
            name="Add User"
            isRequired={true}
            type="string"
            placeholder="Enter here"
            setValue={setAddUser}
            value={addUser}
            margin="10px"
            width="340px"
          />
        </div>
        <div className="add-group-input-dialog-dropdown">
          <CommonDropdown
            DropdownName="Set Permission"
            isRequired={true}
            width="340px"
            selected={selectPermission}
            setSelected={setSelectPermission}
            options={PermissionOptions}
            paddingBottom="5px"
          />
        </div>
        <div className="add-group-dialog-btn">
          <DialogButton
            buttonName="Add"
            onDialogButtonClick={onCreateGroup}
            width="340px"
          />
        </div>
      </div>
    </div>
  );
};

export default AddGroupDialog;
