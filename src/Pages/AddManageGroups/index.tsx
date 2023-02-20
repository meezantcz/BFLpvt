import React, { useState, useEffect } from "react";
import InputDialog from "../../Components/InputDialog";
import Dialogbox from "../../Components/SuccessDialogBox";
import TransparentButtons from "../../Components/TransparentButtons";
import "./styles.scss";
import Table from "../../Components/Table";

import Pagination from "../../Components/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ADD_GROUP } from "../../redux/slice/AllGroupSlice";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import AddGroupDialog from "../../Components/AddGroupsDialog";
import BreadCrumb from "../../Components/BreadCrumb";

let SetPermissionOptions: string[];

interface AddGroupData {
  id: string;
  name: string;

  totalUsers: string;
  permissionGiven: string;
  date: string;
}

const AddGroups = () => {
  const allgroup: AddGroupData[] = useSelector(
    (state: RootState) => state.allgroup.AllGroup
  );
  SetPermissionOptions = ["Administration", "Content Access"];
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const [groupData, setGroupData] = useState<any>(allgroup);

  const [showGroupCreatedDialog, setShowGroupCreatedDialog] = useState(false);

  const columns = [
    { field: "name", header: "Name" },
    { field: "totalUsers", header: "Total Users" },
    { field: "permissionGiven", header: "Permission Given" },
    { field: "date", header: "Creation Date" },
    { field: "actions", header: "Actions" },
  ];
  const [showPerPage, setShowPerPage] = useState<number>(5);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onCreateGroupOpen = () => {
    setShowCreateGroup(true);
  };

  const onCreateGroupClose = () => {
    setShowCreateGroup(false);
  };
  const onGroupCreatedDialogClose = () => {
    setShowGroupCreatedDialog(false);
  };
  const onPaginationChange = (start: number, end: number) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    setGroupData(allgroup);
  }, [allgroup]);

  useEffect(() => {
    if (showGroupCreatedDialog) {
      const timeoutId = setTimeout(() => {
        setShowGroupCreatedDialog(false);
      }, 9000);
      return () => clearTimeout(timeoutId);
    }
  }, [showGroupCreatedDialog]);

  return (
    <>
      <BreadCrumb from="Dashboard" to="Add/Manage Groups" />
      <div className="all-group-display">
        <div className="manage-group-data-container">
          <div className="manage-group-heading">
            <span className="heading2">Manage Groups</span>
            <p className="description-text">
              Lorem ipsum dolor sit amet. Ut modi ullam eos repellendus quas et
            </p>
          </div>

          <div className="create-new-group">
            <div className="create-new-btn">
              <TransparentButtons
                buttonName="+ Create New"
                width="170px"
                onClick={onCreateGroupOpen}
              />
            </div>
          </div>
        </div>
        <div className="all-group-table">
          <Table
            tableName="All Group Table"
            columns={columns}
            TableData={groupData}
            pageStart={pagination.start}
            pageEnd={pagination.end}
          />
        </div>
        <div className="pagination-section">
          <div className="pagination-details">
            Showing <b>{showPerPage}</b> out of <b>{groupData.length}</b> Offers
          </div>
          <div className="add-group-pagination">
            <Pagination
              showPerPage={showPerPage}
              onPaginationChange={onPaginationChange}
              total={groupData.length}
              tableData={allgroup}
            />
          </div>
        </div>
      </div>
      {showCreateGroup && (
        <AddGroupDialog
          onCreateGroupClose={onCreateGroupClose}
          setShowCreateGroup={setShowCreateGroup}
          setShowGroupCreatedDialog={setShowGroupCreatedDialog}
        />
      )}
      {showGroupCreatedDialog && (
        <div className="group-created-dialog">
          <Dialogbox
            mainText="Group Created Succesfully"
            subText="lorem iposum lorem ipsum lorem ipsim"
            onDialogClose={onGroupCreatedDialogClose}
          />
        </div>
      )}
    </>
  );
};
export default AddGroups;
