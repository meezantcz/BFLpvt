import { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import "./styles.scss";
import DownArrow from "../../Assets/Images/blackdownarrow.svg";

interface Props {
  DropdownName: string;
  isRequired: boolean;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  width: string;
  paddingBottom: string;
  isError?: boolean;
  rightSpace?: boolean;
}
const CommonDropdown: React.FC<Props> = ({
  DropdownName,
  isRequired,
  selected,
  setSelected,
  options,
  width,
  paddingBottom,
  isError,
  rightSpace,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <div className="dropdown" style={{ width: width }}>
        <div
          className={isRequired ? "required-dropdown-name" : "dropdown-name"}
          style={{
            paddingBottom: paddingBottom,
          }}
        >
          <span className="input-label">{DropdownName}</span>
        </div>
        <div
          className={`dropdown-btn ${
            rightSpace && "extra_right_margin-dropdown"
          }`}
          onClick={(e) => setShowDropdown(!showDropdown)}
          style={{
            border: isError
              ? "1px solid #FF5274"
              : "1px solid rgb(230,234,246)",
          }}
        >
          {selected}

          <span className={`dropdown-icon ${showDropdown ? "up" : ""}`}>
            <img src={DownArrow} alt="down-arrow" />
          </span>
        </div>
        {showDropdown && (
          <div className="dropdown-content">
            {options.map((option) => (
              <div
                onClick={(e) => {
                  setSelected(option);
                  setShowDropdown(!showDropdown);
                }}
                className="dropdown-item"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CommonDropdown;
