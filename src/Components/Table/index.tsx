import { useState } from "react";
import "./styles.scss";
import { BsSortDownAlt } from "react-icons/bs";
import SortIcon from "../../Assets/Images/sorting.png";
import DeleteDialogBox from "../DeleteDialogBox";
import EditIcon from "../../Assets/Images/editicon.svg";
import DeleteIcon from "../../Assets/Images/delete.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { deleteOffer } from "../../redux/slice/OffersSlice";

interface Props {
  columns: { [key: string]: any }[];
  TableData: { [key: string]: any }[];
  pageStart: number;
  pageEnd: number;
  tableName: string;
  showActionBtn?: Boolean;
}

const Table: React.FC<Props> = ({
  columns,
  TableData,
  pageStart,
  pageEnd,
  tableName,
  showActionBtn,
}) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [deletedRow, setDeletedRow] = useState({});
  const dispatch = useDispatch<AppDispatch>();

  const onDelete = (rowData: any) => {
    console.log("Row data: ", rowData);
    console.log("Row data id: ", rowData._id);

    setDeletedRow(rowData);

    setShowDelete(true);
  };

  if (columns && TableData) {
    return (
      <>
        <div className="table-container">
          <table className="listing-table">
            <thead>
              <tr>
                <th scope="col">
                  {tableName !== "Archived Items" && "Activity Log" ? (
                    <>
                      <div className="heading-form-check">
                        <input
                          className="input-checkbox"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </th>
                {columns.map((head) => (
                  <th className="table-heading">
                    <span className="table-header-name">{head.header}</span>
                    {tableName !== "Archived Items" && "Activity Log" ? (
                      <>
                        <span className="heading-icon">
                          {" "}
                          <img src={SortIcon} alt="sort-icon" />
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TableData.slice(pageStart, pageEnd).map((row) => (
                <tr className="table-rows">
                  <td>
                    {tableName !== "Archived Items" && "Activity Log" ? (
                      <>
                        <div className="form-check">
                          <input
                            className="input-checkbox"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </td>

                  {columns.map((col) => {
                    if (
                      col.field !== "actions" &&
                      col.field !== "moderationStatus"
                    ) {
                      return <td>{row[col.field]}</td>;
                    } else if (col.field === "moderationStatus") {
                      let statusClass = "";
                      switch (row[col.field]) {
                        case "Approved":
                          statusClass = "status-approved";
                          break;
                        case "Rejected":
                          statusClass = "status-rejected";
                          break;
                        case "Pending":
                          statusClass = "status-pending";
                          break;
                        case "Published":
                          statusClass = "status-published";
                          break;
                        case "Unpublished":
                          statusClass = "status-unpublished";
                          break;
                        default:
                          statusClass = "";
                          break;
                      }
                      return (
                        <td className="table-status-container">
                          <div className={`table-status ${statusClass}`}>
                            <div className={statusClass}>{row[col.field]}</div>
                          </div>
                        </td>
                      );
                    } else {
                      // render actions column
                      return (
                        <td>
                          {showActionBtn && (
                            <div className="edit-delete-btns">
                              <div className="icon-circle edit-btn-table">
                                <img
                                  src={EditIcon}
                                  alt="edit-icon"
                                  className="edit-icon-table"
                                />
                              </div>
                              <div
                                className="icon-circle delete-btn-table"
                                onClick={() => onDelete(row)}
                              >
                                <img
                                  src={DeleteIcon}
                                  alt="delete-icon"
                                  className="delete-icon-table"
                                />
                              </div>
                            </div>
                          )}
                        </td>
                      );

                      //   const buttonsArray = row[col.field].split(",");
                      //   return (
                      //     <td>
                      //       <div className="edit-delete-btns">
                      //         {buttonsArray.map((m: string, index: number) => (
                      //           <div>
                      //             {index === 0 ? (
                      // <div className=" icon-circle edit-btn-table">
                      //   <img
                      //     src={EditIcon}
                      //     alt="edit-icon"
                      //     className="edit-icon-table"
                      //   />
                      // </div>
                      //             ) : (
                      // <div
                      //   className="icon-circle delete-btn-table"
                      //   onClick={() => onDelete(row)}
                      // >
                      //   <img
                      //     src={DeleteIcon}
                      //     alt="delete-icon"
                      //     className="delete-icon-table"
                      //   />
                      // </div>
                      //             )}
                      //           </div>
                      //         ))}
                      //       </div>
                      //     </td>
                      //   );
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showDelete && (
          <DeleteDialogBox
            setShowDelete={setShowDelete}
            deletedRow={deletedRow}
          />
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default Table;
