import React, { useEffect, useState } from "react";
import "./index.scss";
import { useSelector } from "react-redux";
interface Props {
  showPerPage: number;
  onPaginationChange: (start: number, end: number) => void;
  total: number;
  tableData: { [key: string]: any }[];
}

const Pagination: React.FC<Props> = ({
  showPerPage,
  onPaginationChange,
  total,
  tableData,
}) => {
  const [counter, setCounter] = useState(1);
  const [numberOfButtons, setNumberOfButoons] = useState(
    Math.ceil(total / showPerPage)
  );

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  useEffect(() => {}, [tableData]);

  const onPrevNextClick = (type: string) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (numberOfButtons === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };

  return (
    <div className="pagination-container">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              onClick={() => {
                onPrevNextClick("prev");
              }}
            >
              {"<"}
            </a>
          </li>
          {new Array(numberOfButtons).fill("").map((el, index) => (
            <li
              className={`page-item ${index + 1 === counter ? "active" : null}`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => setCounter(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              onClick={() => onPrevNextClick("next")}
            >
              {">"}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
