import { useState, useEffect } from "react";
import CommonDropdown from "../../Components/CommonDropdown";
import CheckboxDropdown from "../../Components/CheckboxDropdown";
import CommonInputField from "../../Components/CommonInputField";
import Table from "../../Components/Table";
import TransparentButtons from "../../Components/TransparentButtons";
import "./styles.scss";
import Pagination from "../../Components/Pagination";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { DELETE_OFFER } from "../../redux/slice/OffersSlice";
import { useDispatch } from "react-redux";
import ColorButton from "../../Components/ColorButton";
import BreadCrumb from "../../Components/BreadCrumb";
import ExcelIcon from "../../Assets/Images/excel.svg";
import { fetchOffersData } from "../../redux/slice/OffersSlice";

const columns = [
  { field: "_id", header: "Offer Id" },
  { field: "offerName", header: "Offer Name" },
  { field: "campaignStartDate", header: "Start Date" },
  { field: "campaignEndDate", header: "End Date" },
  { field: "offerType", header: "Offer Type" },
  { field: "moderationStatus", header: "Status" },
  { field: "actions", header: "Actions" },
];

let OfferTypeOptions: string[];
OfferTypeOptions = ["Offers", "Rewards"];
let OfferStatusOptions: string[];
OfferStatusOptions = ["Approved", "Rejected", "Pending"];
let DeviceTypeOptions: string[];
DeviceTypeOptions = ["Web Offers", "App Offers"];

const OffersListing = () => {
  const [uidName, setUidName] = useState<string>("");
  const [selectType, setSelectType] = useState<string>("Select Type");
  const [selectOfferStatus, setSelectOfferStatus] = useState<string>(
    "Select Offer Status"
  );
  const [selectDeviceType, setSelectDeviceType] =
    useState<string>("Select Device Type");

  const offers: any = useSelector((state: RootState) => state.offers.Offers);

  const [offerData, setOfferData] = useState(offers);
  console.log(offerData, " JACK");

  const [showPerPage, setShowPerPage] = useState<number>(5);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOffersData("all"));
  }, [dispatch]);

  useEffect(() => {
    setOfferData(offers);
  }, [offers]);

  const onPaginationChange = (start: number, end: number) => {
    setPagination({ start: start, end: end });
  };

  const onSearch = () => {
    if (selectDeviceType === "Web Offers") {
      dispatch(fetchOffersData("Web"));
    } else if (selectDeviceType === "App Offers") {
      dispatch(fetchOffersData("App"));
    }
  };

  return (
    <div>
      <BreadCrumb from="Dashboard" to="Offer Listing" />
      <div className="search-offer-container">
        <div className="input-label" style={{ paddingLeft: "10px" }}>
          Search Offers
        </div>
        <div className="search-fields">
          <input
            type="text"
            placeholder="Enter UID Name"
            className="uid-input"
            value={uidName}
            onChange={(e) => setUidName(e.target.value)}
          />

          <div className="select-type">
            <CommonDropdown
              DropdownName=""
              isRequired={false}
              selected={selectType}
              setSelected={setSelectType}
              options={OfferTypeOptions}
              width="186px"
              paddingBottom="0px"
            />
          </div>
          <div className="select-offer-status">
            <CommonDropdown
              DropdownName=""
              isRequired={false}
              selected={selectOfferStatus}
              setSelected={setSelectOfferStatus}
              options={OfferStatusOptions}
              width="186px"
              paddingBottom="0px"
            />
          </div>
          <div className="select-device-type">
            <CommonDropdown
              DropdownName=""
              isRequired={false}
              selected={selectDeviceType}
              setSelected={setSelectDeviceType}
              options={DeviceTypeOptions}
              width="186px"
              paddingBottom="0px"
            />
          </div>
          <div className="offer-search-btn">
            <ColorButton buttonName="Search" width="120px" onClick={onSearch} />
          </div>
        </div>
      </div>
      <div className="offer-data-container">
        <div className="offer-heading">
          <span className="offer-title">Offer listing</span>
          <p className="offer-description">
            Lorem ipsum dolor sit amet. Ut modi ullam eos repellendus quas et
          </p>
        </div>
        <div className="offer-btn-container">
          <div className="action-btn">
            <TransparentButtons
              buttonName="Create Offer"
              width="140px"
              onClick={() => {}}
            />
          </div>
          <div className="action-btn">
            <TransparentButtons
              buttonName="Export"
              width="140px"
              onClick={() => {}}
              buttonImage={ExcelIcon}
            />
          </div>
          <div className="action-btn">
            <TransparentButtons
              buttonName="Approve"
              width="140px"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>

      <div className="offer-table-container">
        <Table
          showActionBtn={true}
          tableName="Offer Listing"
          columns={columns}
          TableData={offerData}
          pageStart={pagination.start}
          pageEnd={pagination.end}
        />
      </div>

      <div className="pagination-section">
        <div className="pagination-details">
          Showing <b>{showPerPage}</b> out of <b>{offerData.length}</b> Offers
        </div>
        <div className="offer-listing-pagination">
          <Pagination
            showPerPage={showPerPage}
            onPaginationChange={onPaginationChange}
            total={offerData.length}
            tableData={offerData}
          />
        </div>
      </div>
    </div>
  );
};

export default OffersListing;
