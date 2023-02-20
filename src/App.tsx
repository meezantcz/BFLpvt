import React from "react";

import CreateOfferWeb from "./Pages/CreateOfferWeb";
import CreateOfferApp from "./Pages/CreateOfferApp";
import CreateOffer from "./Pages/CreateOffer";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Auth";
import NotFound from "./Components/NotFound";
import "./Scss/theme.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import OffersListing from "./Pages/OffersListing";
import AddUser from "./Pages/AddManageUser";
import AddGroups from "./Pages/AddManageGroups";
import AddPermission from "./Pages/AddManagePermission";
import ArchivedItems from "./Pages/ArchivedItems";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import BulkUpload from "./Pages/BulkUpload";
import DuplicateWebOffer from "./Pages/DuplicateWebOffer";
import DuplicateAppOffer from "./Pages/DuplicateAppOffer";
import DuplicateWebReward from "./Pages/DuplicateWebReward";
import DuplicateAppReward from "./Pages/DuplicateAppReward";
import CreateRewardWeb from "./Pages/CreateRewardWeb";
import CreateRewardApp from "./Pages/CreateRewardApp";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      {pathname !== "/login" && <Navbar />}
      <div className="main-container">
        {pathname !== "/login" && (
          <div className="side-bar">
            <Sidebar />
          </div>
        )}
        <div
          className={
            pathname !== "/login" ? "page-container" : "full-page-container"
          }
        >
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="myarchive" element={<ArchivedItems />} />
            <Route path="createoffer/web" element={<CreateOfferWeb />} />
            <Route path="createoffer/app" element={<CreateOfferApp />} />
            <Route path="createoffer/web-app" element={<CreateOffer />} />
            <Route path="createreward/web" element={<CreateRewardWeb />} />
            <Route path="createreward/app" element={<CreateRewardApp />} />
            <Route
              path="createoffer/web/createduplicate"
              element={<DuplicateWebOffer />}
            />
            <Route
              path="createoffer/app/createduplicate"
              element={<DuplicateAppOffer />}
            />
            <Route
              path="createreward/web/createduplicate"
              element={<DuplicateWebReward />}
            />
            <Route
              path="createreward/app/createduplicate"
              element={<DuplicateAppReward />}
            />

            <Route path="offerlisting" element={<OffersListing />} />
            <Route path="bulkupload" element={<BulkUpload />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="addgroups" element={<AddGroups />} />
            <Route path="addpermission" element={<AddPermission />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
