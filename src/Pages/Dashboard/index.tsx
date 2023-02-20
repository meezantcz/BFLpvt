import React, { useState } from "react";
import "./styles.scss";

import ColorButton from "../../Components/ColorButton";
import CreateOfferDialog from "../../Components/CreateOfferDialog";

const Dashboard = () => {
  const [showCreateOfferDialog, setShowCreateOfferDialog] =
    useState<boolean>(false);
  const onCreate = () => {
    setShowCreateOfferDialog(true);
  };

  return (
    <>
      <div
        className={`dashboard-container ${
          showCreateOfferDialog ? "blurred" : ""
        }`}
      >
        <div className="welcome-user-container">
          <div className="welcome-user-heading">
            <span className="heading1">Welcome, Jon Doe</span>
            <p className="heading3">
              Last logged in : 02:30 PM Tue, 13 December 2022
            </p>
          </div>
          <div className="create-offer-navigation">
            <ColorButton buttonName="Create" width="149px" onClick={onCreate} />
          </div>
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

export default Dashboard;
