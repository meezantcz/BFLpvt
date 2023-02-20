import { useState } from "react";
import "../Navbar/styles.scss";
import { BiUserCircle } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import UserDropdown from "./UserDropdown";
import NavbarLogo from "../../Assets/Images/bajajfinservlogo.svg";
import UserLogo from "../../Assets/Images/userlogo.svg";
import DownArrow from "../../Assets/Images/downarrow.svg";

const Navbar = () => {
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);

  const onUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  return (
    <>
      <div className="my-navbar">
        <div className="logo">
          <img src={NavbarLogo} alt="logo" />
        </div>
        <div className="user">
          <div className="user-logo">
            <img src={UserLogo} alt="user" />
          </div>
          <div className="user-name">Jon</div>
          <div
            className={`arrow ${showUserDropdown ? "up" : ""}`}
            onClick={onUserDropdown}
          >
            <img src={DownArrow} alt="down-arrow" />
          </div>
        </div>
      </div>
      {showUserDropdown && <UserDropdown />}
    </>
  );
};

export default Navbar;
