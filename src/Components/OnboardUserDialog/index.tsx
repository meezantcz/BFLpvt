import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import CommonDropdown from "../CommonDropdown";
import CommonInputField from "../CommonInputField";
import DialogButton from "../DialogButton";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./index.scss";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { ADD_USER } from "../../redux/slice/AllUserSlice";

interface Props {
  onOnBoardClose: () => void;
  setShowOnboardUser: React.Dispatch<React.SetStateAction<boolean>>;
  setShowUserAddedDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

let AssignGroupOptions: string[];
AssignGroupOptions = ["Administration", "Content Access"];
const OnboardUserDialog: React.FC<Props> = ({
  onOnBoardClose,
  setShowOnboardUser,
  setShowUserAddedDialog,
}) => {
  const [fullName, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [assignGroup, setAssignGroup] = useState<string>("Select");
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const onShowSetPassword = () => {
    setShowSetPassword(!showSetPassword);
  };

  const onShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onOnboardUser = () => {
    if (fullName && email && password && confirmPassword && assignGroup) {
      dispatch(
        ADD_USER({
          id: nanoid(),
          name: fullName,
          email: email,
          permissionAssign: assignGroup,
          date: `${new Date().getDate()} ${new Intl.DateTimeFormat("en-US", {
            month: "long",
          }).format(new Date())} ${new Date().getFullYear()}`,
          groupAssign: "lorem ipsum",
          actions: "edit,delete",
        })
      );
      setShowUserAddedDialog(true);
      setShowOnboardUser(false);
    }
  };

  return (
    <>
      <div className="onboard-user-container">
        <div className="onboard-header">
          <div className="onboard-heading">Onboard User</div>
          <div className="onboard-cross-icon" onClick={onOnBoardClose}>
            <RxCross2 />
          </div>
        </div>
        <div className="onboard-hr">
          <hr />
        </div>
        <div className="onboard-inputs-container">
          <div className="onboard-input">
            <CommonInputField
              name="Full name"
              type="string"
              placeholder="Enter here"
              value={fullName}
              setValue={setFullname}
              isRequired={true}
              width="160px"
              margin="10px"
            />
          </div>
          <div className="onboard-input">
            <CommonInputField
              name="Email Address"
              type="string"
              placeholder="Enter here"
              value={email}
              setValue={setEmail}
              isRequired={true}
              width="160px"
              margin="10px"
            />
          </div>
          <div className="onboard-input">
            <CommonInputField
              name="Set Password"
              type={showSetPassword ? "text" : "password"}
              placeholder="Enter here"
              value={password}
              setValue={setPassword}
              isRequired={true}
              width="160px"
              margin="10px"
            />
            <i onClick={onShowSetPassword} className="set-onboard-eye">
              {showSetPassword ? (
                <>
                  <AiFillEyeInvisible size={17} />
                </>
              ) : (
                <>
                  <AiFillEye size={17} />
                </>
              )}
            </i>
          </div>
          <div className="onboard-input">
            <CommonInputField
              name="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter here"
              isRequired={true}
              value={confirmPassword}
              setValue={setConfirmPassword}
              width="160px"
              margin="10px"
            />
            <i onClick={onShowConfirmPassword} className="confirm-onboard-eye">
              {showConfirmPassword ? (
                <>
                  <AiFillEyeInvisible size={17} />
                </>
              ) : (
                <>
                  <AiFillEye size={17} />
                </>
              )}
            </i>
          </div>
          <div className="onboard-dropdown">
            <CommonDropdown
              DropdownName="Assign Group"
              isRequired={true}
              width="340px"
              selected={assignGroup}
              setSelected={setAssignGroup}
              options={AssignGroupOptions}
              paddingBottom="5px"
            />
          </div>
          <div className="onboard-btn">
            <DialogButton
              buttonName="Onboard User"
              width="345px"
              onDialogButtonClick={onOnboardUser}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardUserDialog;
