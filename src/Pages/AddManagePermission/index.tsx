import { useState, useEffect } from "react";
import TransparentButtons from "../../Components/TransparentButtons";
import InputDialog from "../../Components/InputDialog";
import Dialogbox from "../../Components/SuccessDialogBox";

import Table from "../../Components/Table";
import Pagination from "../../Components/Pagination";
import "./styles.scss";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import AddPermissionDialog from "../../Components/AddPermissionDialog";
import BreadCrumb from "../../Components/BreadCrumb";

interface AddPermissionData {
  id: string;
  name: string;
  totalGroup: string;
  permissionId: string;
  date: string;
}

const AddPermission = () => {
  const allpermission: AddPermissionData[] = useSelector(
    (state: RootState) => state.allpermission.AllPermission
  );
  const [showAddPermission, setShowAddPermission] = useState(false);
  const [permissionName, setPermissionName] = useState<string>("");
  const [permissionId, setPermissionId] = useState<string>("");
  const [selectGroup, setSelectGroup] = useState<string>("Select");
  const [permissionData, setPermissionData] = useState<any>(allpermission);
  const [showPermissionCreatedDialog, setShowPermissionCreatedDialog] =
    useState(false);
  const [showPerPage, setShowPerPage] = useState<number>(5);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const columns = [
    { field: "name", header: "Name" },
    { field: "totalGroup", header: "Total Group" },
    { field: "permissionId", header: "Permission ID" },
    { field: "date", header: "Creation Date" },

    { field: "actions", header: "Actions" },
  ];
  let GroupOptions: string[];
  GroupOptions = ["Group1", "Group2"];

  const onAddPermissionOpen = () => {
    setShowAddPermission(true);
  };

  const onAddPermissionDialogClose = () => {
    setShowAddPermission(false);
  };

  const onPermisionCreatedDialogClose = () => {
    setShowPermissionCreatedDialog(false);
  };

  const onPaginationChange = (start: number, end: number) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    setPermissionData(allpermission);
  }, [allpermission]);

  useEffect(() => {
    if (showPermissionCreatedDialog) {
      const timeoutId = setTimeout(() => {
        setShowPermissionCreatedDialog(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [showPermissionCreatedDialog]);

  console.log(permissionData, "ppp");
  return (
    <>
      <BreadCrumb from="Dashboard" to="Add/Manage Permission" />
      <div className="all-permission-display">
        <div className="manage-permission-data-container">
          <div className="manage-permission-heading">
            <span className="heading2">Manage Permission</span>
            <p className="description-text">
              Lorem ipsum dolor sit amet. Ut modi ullam eos repellendus quas et
            </p>
          </div>

          <div className="create-new-permission">
            <div className="add-new-btn">
              <TransparentButtons
                buttonName="+ Add New"
                width="170px"
                onClick={onAddPermissionOpen}
              />
            </div>
          </div>
        </div>
        <div className="all-permission-table">
          <Table
            tableName="All Permission Table"
            columns={columns}
            TableData={permissionData}
            pageStart={pagination.start}
            pageEnd={pagination.end}
          />
        </div>
        <div className="pagination-section">
          <div className="pagination-details">
            Showing <b>{showPerPage}</b> out of <b>{permissionData.length}</b>{" "}
            Offers
          </div>
          <div className="add-permission-pagination">
            <Pagination
              showPerPage={showPerPage}
              onPaginationChange={onPaginationChange}
              total={permissionData.length}
              tableData={allpermission}
            />
          </div>
        </div>
      </div>
      {showAddPermission && (
        <AddPermissionDialog
          onAddPermissionDialogClose={onAddPermissionDialogClose}
          setShowAddPermission={setShowAddPermission}
          setShowPermissionCreatedDialog={setShowPermissionCreatedDialog}
        />
      )}
      {showPermissionCreatedDialog && (
        <div className="permission-added-dialog">
          <Dialogbox
            mainText="Permission added Succesfully"
            subText="lorem iposum lorem ipsum lorem ipsim"
            onDialogClose={onPermisionCreatedDialogClose}
          />
        </div>
      )}
    </>
  );
};

export default AddPermission;
