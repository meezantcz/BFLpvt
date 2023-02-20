import { useState } from "react";
import "./styles.scss";
import { BsSortDownAlt } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteDialogBox from "../DeleteDialogBox";
import EditIcon from "../../Assets/Images/editicon.svg";
import DeleteIcon from "../../Assets/Images/delete.svg";

interface Props {
  columns: { [key: string]: any }[];
  TableData: { [key: string]: any }[];
  pageStart: number;
  pageEnd: number;
  tableName: string;
}

const Table: React.FC<Props> = ({
  columns,
  TableData,
  pageStart,
  pageEnd,
  tableName,
}) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [deletedRow, setDeletedRow] = useState({});

  const onDelete = (rowData: any) => {
    console.log("Row data: ", rowData);
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
                          <BsSortDownAlt />
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
                    if (col.field !== "actions" && col.field !== "status") {
                      return <td>{row[col.field]}</td>;
                    } else if (col.field === "status") {
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
                      const buttonsArray = row[col.field].split(",");
                      return (
                        <td>
                          <div className="edit-delete-btns">
                            {buttonsArray.map((m: string, index: number) => (
                              <div>
                                {index === 0 ? (
                                  <div className="edit-btn-table">
                                    <img
                                      src={EditIcon}
                                      alt="edit-icon"
                                      className="edit-icon-table"
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className="delete-btn-table"
                                    onClick={() => onDelete(row)}
                                  >
                                    <img
                                      src={DeleteIcon}
                                      alt="delete-icon"
                                      className="delete-icon-table"
                                    />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </td>
                      );
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
