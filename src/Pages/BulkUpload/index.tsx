import React, { useRef } from "react";
import BreadCrumb from "../../Components/BreadCrumb";
import "./styles.scss";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

const BulkUpload: React.FC = () => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    if (file.type !== "application/vnd.ms-excel" && file.type !== "text/csv") {
      alert("Only Excel or CSV files are allowed");
      return;
    }
    // perform the upload
  };

  return (
    <>
      <BreadCrumb from="Dashboard" to="Bulk Upload" />
      <div className="bulk-upload-display">
        <div className="bulk-upload-data-container">
          <div className="bulk-upload-heading">
            <div className="heading2">Bulk Upload</div>
            <p className="description-text">
              Lorem ipsum dolor sit amet consectetFoluta atque.
            </p>
          </div>
        </div>
        <div className="upload-file-container">
          <input
            type="file"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <div className="file-icon">
            <BsFillFileEarmarkPdfFill size={30} />
          </div>
          <div className="click-to-upload-text">
            <a className="click-to-upload" onClick={handleClick}>
              Click to upload file,
            </a>
            <span className="drop-here-text"> or drag & drop it here</span>
            <p className="file-sub-text">
              Maximum file size <span className="file-size">50 MB -</span>File
              supported Excel or CSV
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkUpload;
