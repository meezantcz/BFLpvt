import { useState } from "react";
import Table from "../../Components/Table";
import TransparentButtons from "../../Components/TransparentButtons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import "./styles.scss";
import SearchBar from "../../Components/SearchBar";
import BreadCrumb from "../../Components/BreadCrumb";

interface ArchivedItemsData {
  itemName: string;
  itemId: string;
  expiry: string;
  archivedDate: string;
  actions: string;
}

const ArchivedItems = () => {
  const archives: ArchivedItemsData[] = useSelector(
    (state: RootState) => state.offers.ArchivedItems
  );
  console.log("arch", archives);
  const columns = [
    { field: "itemName", header: "Item Name" },
    { field: "itemId", header: "Item ID" },
    { field: "expiry", header: "Expiry" },
    { field: "archivedDate", header: "Archived on" },

    { field: "actions", header: "Actions" },
  ];
  const [showPerPage, setShowPerPage] = useState<number>(5);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  return (
    <>
      <BreadCrumb from="Dashboard" to="Archived Items" />
      <div className="archived-items-display">
        <div className="archived-items-data-container">
          <div className="archived-items-heading">
            <span className="heading2">Archived Items</span>
            <p className="description-text">
              Lorem ipsum dolor sit amet. Ut modi ullam eos repellendus quas et
            </p>
          </div>
          <div className="serach-archive">
            <div className="search-archive-component">
              <SearchBar placeholder="Search Item" width="250px" />
            </div>
          </div>
        </div>
        <div className="archived-items-table">
          <Table
            tableName="Archived Items"
            columns={columns}
            TableData={archives}
            pageStart={pagination.start}
            pageEnd={pagination.end}
          />
        </div>
      </div>
      ;
    </>
  );
};

export default ArchivedItems;
