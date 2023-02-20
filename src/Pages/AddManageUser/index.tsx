import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import TransparentButtons from "../../Components/TransparentButtons";
import Table from "../../Components/Table";
import Pagination from "../../Components/Pagination";
import "./styles.scss";
import OnboardUserDialog from "../../Components/OnboardUserDialog";
import Dialogbox from "../../Components/SuccessDialogBox";
import { RootState } from "../../redux/store";
import BreadCrumb from "../../Components/BreadCrumb";

interface AllUserData {
  id: string;
  name: string;
  email: string;
  permissionAssign: string;
  date: string;
  groupAssign: string;
}

const AddUser = () => {
  const allUser: AllUserData[] = useSelector(
    (state: RootState) => state.alluser.AllUser
  );
  const [userData, setUserData] = useState<any>(allUser);
  const [showOnboardUser, setShowOnboardUser] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showUserAddedDialog, setShowUserAddedDialog] = useState(false);
  const dispatch = useDispatch();

  const columns = [
    { field: "name", header: "Name" },
    { field: "email", header: "Email Address" },
    { field: "permissionAssign", header: "Permission Assign" },
    { field: "date", header: "Onboard Date" },
    { field: "groupAssign", header: "Group Assign" },
    { field: "actions", header: "Actions" },
  ];
  const [showPerPage, setShowPerPage] = useState<number>(5);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start: number, end: number) => {
    setPagination({ start: start, end: end });
  };

  const onOnboardUserOpen = () => {
    setShowOnboardUser(true);
  };
  const onOnBoardClose = () => {
    setShowOnboardUser(false);
  };

  const onUserAddedDialogeClose = () => {
    setShowUserAddedDialog(false);
  };

  useEffect(() => {
    setUserData(allUser);
  }, [allUser]);

  console.log("all user redux", allUser);
  console.log("alluser data", userData);

  useEffect(() => {
    if (showUserAddedDialog) {
      const timeoutId = setTimeout(() => {
        setShowUserAddedDialog(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [showUserAddedDialog]);

  return (
    <>
      <BreadCrumb from="Dashboard" to="Add/Manage User" />
      <div className="all-user-display">
        <div className="add-user-data-container">
          <div className="add-user-heading">
            <span className="heading2">All User</span>
            <p className="description-text">
              Lorem ipsum dolor sit amet. Ut modi ullam eos repellendus quas et
            </p>
          </div>
          {showExport && (
            <>
              <div className="all-user-export">
                <div className="all-user-export-icon"></div>
                <div className="export-btn">Export</div>
              </div>
            </>
          )}
          <div className="onboard-user">
            <div className="onboard-user-btn">
              <TransparentButtons
                buttonName="+ Onboard User"
                width="170px"
                onClick={onOnboardUserOpen}
              />
            </div>
          </div>
        </div>

        <div className="all-user-table">
          <Table
            tableName="All User Table"
            columns={columns}
            TableData={userData}
            pageStart={pagination.start}
            pageEnd={pagination.end}
          />
        </div>
        <div className="pagination-section">
          <div className="pagination-details">
            Showing <b>{showPerPage}</b> out of <b>{userData.length}</b> Offers
          </div>
          <div className="offer-listing-pagination">
            <Pagination
              showPerPage={showPerPage}
              onPaginationChange={onPaginationChange}
              total={userData.length}
              tableData={allUser}
            />
          </div>
        </div>
      </div>
      {showOnboardUser && (
        <OnboardUserDialog
          onOnBoardClose={onOnBoardClose}
          setShowOnboardUser={setShowOnboardUser}
          setShowUserAddedDialog={setShowUserAddedDialog}
        />
      )}
      {showUserAddedDialog && (
        <div className="user-added-dialog">
          <Dialogbox
            mainText="User Added Succesfully"
            subText="lorem iposum lorem ipsum lorem ipsim"
            onDialogClose={onUserAddedDialogeClose}
          />
        </div>
      )}
    </>
  );
};

export default AddUser;
