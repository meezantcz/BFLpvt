import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { TfiGift } from "react-icons/tfi";

import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import "./styles.scss";
import CreateOfferDialog from "../CreateOfferDialog";
import DashboardIcon from "../../Assets/Images/dashboardicon.svg";
import OffersRewardsIcon from "../../Assets/Images/offersrewardicon.svg";
import DownArrow from "../../Assets/Images/downarrow.svg";

const Sidebar = () => {
  const [dashboard, setDashboard] = useState<boolean>(false);
  const [showOffersDropdown, setShowOffersDropdown] = useState(false);
  const [showUserManagementDropdown, setShowUserManagementDropdown] =
    useState(false);
  const [showCreateOfferDialog, setShowCreateOfferDialog] = useState(false);

  const navigate = useNavigate();

  const handleDashboard = () => {
    setDashboard(true);
    setShowCreateOfferDialog(false);
  };

  const handleCreateOffer = () => {
    setShowCreateOfferDialog(true);
  };

  const handleOfferListing = () => {
    navigate("/offerlisting");
    setShowCreateOfferDialog(false);
  };

  const handleBulkUpload = () => {
    navigate("/bulkupload");
    setShowCreateOfferDialog(false);
  };

  const handleAddUser = () => {
    navigate("/adduser");
    setShowCreateOfferDialog(false);
  };
  const handleAddGroup = () => {
    navigate("/addgroups");
    setShowCreateOfferDialog(false);
  };
  const handleAddPermission = () => {
    navigate("/addpermission");
    setShowCreateOfferDialog(false);
  };

  return (
    <>
      <div className="menu-container">
        <div className="dashboard" onClick={handleDashboard}>
          <span onClick={() => navigate("/dashboard")}>
            <span className="dashboard-icon">
              <img src={DashboardIcon} alt="dashboard-icon" />
            </span>
            <span className="white-heading1"> Dashboard </span>
          </span>
        </div>
        <div className={showOffersDropdown ? "active-div" : ""}>
          <div>
            <span
              className="offers-reward"
              onClick={() => setShowOffersDropdown(!showOffersDropdown)}
            >
              <div className="offers-icon">
                <img src={OffersRewardsIcon} alt="offers-rewrds-icon" />
              </div>
              <span className="white-heading1">Offers & Rewards</span>
              <div className={`arrow ${showOffersDropdown ? "up" : ""}`}>
                <img
                  src={DownArrow}
                  alt="down-arrow"
                  style={{ padding: "5px" }}
                />
              </div>
            </span>
          </div>
          {showOffersDropdown && (
            <div className="offers-dropdown">
              <ul className="offers-list">
                <div className="active-menu-items">
                  <li className="offer-item" onClick={handleCreateOffer}>
                    <span className="left-arrow">
                      <HiArrowLongRight />
                    </span>{" "}
                    <span className="white-heading2">Create Offer</span>
                  </li>
                </div>
                <div className="active-menu-items">
                  <li className="offer-item" onClick={handleOfferListing}>
                    {" "}
                    <span className="left-arrow">
                      <HiArrowLongRight />
                    </span>
                    <span className="white-heading2"> Offer lisiting</span>
                  </li>
                </div>
                <div className="active-menu-items">
                  <li className="offer-item" onClick={handleBulkUpload}>
                    {" "}
                    <span className="left-arrow">
                      <HiArrowLongRight />
                    </span>
                    <span className="white-heading2"> Bulk Upload</span>
                  </li>
                </div>
              </ul>
            </div>
          )}
        </div>

        <div className={showUserManagementDropdown ? "active-div" : ""}>
          <div
            className="user-management"
            onClick={() =>
              setShowUserManagementDropdown(!showUserManagementDropdown)
            }
          >
            <span className="user-management-icon">
              <FaUserPlus color="white" />
            </span>
            <span className="white-heading1">User Management</span>
            <div className={`arrow ${showUserManagementDropdown ? "up" : ""}`}>
              <img
                src={DownArrow}
                alt="down-arrow"
                style={{ padding: "5px" }}
              />
            </div>
          </div>
          {showUserManagementDropdown && (
            <div className="user-management-dropdown">
              <ul className="users-dropdown-list">
                <div className="active-menu-items">
                  <li className="user-item" onClick={handleAddUser}>
                    <span className="left-arrow">
                      <HiArrowLongRight />
                    </span>{" "}
                    <span className="white-heading2"> Add/Manage User</span>
                  </li>
                </div>
                <div className="active-menu-items">
                  <li className="user-item" onClick={handleAddGroup}>
                    {" "}
                    <span className="left-arrow">
                      <HiArrowLongRight />
                    </span>
                    <span className="white-heading2"> Add/Manage Groups</span>
                  </li>
                </div>
                <div className="active-menu-items">
                  <li className="user-item" onClick={handleAddPermission}>
                    {" "}
                    <span className="left-arrow">
                      <HiArrowLongRight />
                    </span>
                    <span className="white-heading2">
                      {" "}
                      Add/Manage Permissions
                    </span>
                  </li>
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
      {showCreateOfferDialog && (
        <CreateOfferDialog
          setShowCreateOfferDialog={setShowCreateOfferDialog}
        />
      )}
    </>
  );
};

export default Sidebar;
