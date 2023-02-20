import { useState } from "react";
import "./styles.scss";
import SearchBar from "../../Components/SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Table from "../../Components/Table";
import CommonDropdown from "../../Components/CommonDropdown";
import BreadCrumb from "../../Components/BreadCrumb";

interface AllUserData {
  id: string;
  name: string;
  email: string;
  permissionAssign: string;
  date: string;
  groupAssign: string;
}

const ActivityLog = () => {
  const allUser: AllUserData[] = useSelector(
    (state: RootState) => state.alluser.AllUser
  );
  const columns = [
    { field: "date", header: "Date" },
    { field: "author", header: "Author" },
    { field: "type", header: "Type" },
    { field: "label", header: "Label" },

    { field: "description", header: "Description" },
  ];
  let SelectUserOptions: string[];
  SelectUserOptions = ["Administration", "Content Access"];
  const [selectUser, setSelectUser] = useState<string>("Select User");
  const [showPerPage, setShowPerPage] = useState<number>(5);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  return (
    <>
      <BreadCrumb from="Dashboard" to="Activity Log" />
      <div className="activity-log-display">
        <div className="activity-log-data-container">
          <div className="activity-log-heading">
            <span className="heading2">Activity Logs</span>
            <p className="description-text">
              Lorem ipsum dolor sit amet. Ut modi ullam eos repellendus quas et
            </p>
          </div>

          <div className=" select-user-activity">
            <CommonDropdown
              DropdownName=""
              isRequired={false}
              selected={selectUser}
              setSelected={setSelectUser}
              options={SelectUserOptions}
              width="214px"
              paddingBottom="0px"
            />
          </div>
          <div className="search-item-activity">
            <SearchBar placeholder="Search Item" width="250px" />
          </div>
        </div>
        <div className="archived-items-table">
          <Table
            tableName="Archived Items"
            columns={columns}
            TableData={allUser}
            pageStart={pagination.start}
            pageEnd={pagination.end}
          />
        </div>
      </div>
      ;
    </>
  );
};

export default ActivityLog;
