import { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import DownArrow from "../../Assets/Images/blackdownarrow.svg";
import "./styles.scss";

interface Props {
  DropdownName: string;
  isRequired: boolean;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  width: string;
  paddingBottom: string;
}

const CheckboxDropdown: React.FC<Props> = ({
  DropdownName,
  isRequired,
  selected,
  setSelected,
  options,
  width,
  paddingBottom,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [prevSelected, setPrevSelected] = useState("");

  const handleOptionClick = (option: string) => {
    setSelected(option);
    setPrevSelected(selected);
    setShowDropdown(false);
  };

  return (
    <>
      <div className="checkbox-dropdown" style={{ width: width }}>
        <div
          className={
            isRequired
              ? "checkox-required-dropdown-name"
              : "checkbox-dropdown-name"
          }
          style={{ paddingBottom: paddingBottom }}
        >
          {DropdownName}
        </div>
        <div
          className="checkbox-dropdown-btn"
          onClick={(e) => setShowDropdown(!showDropdown)}
        >
          {selected}
          <span className={`dropdown-icon ${showDropdown ? "up" : ""}`}>
            <img src={DownArrow} alt="down-arrow" />
          </span>
        </div>
        {showDropdown && (
          <div className="checkbox-dropdown-content">
            {options.map((option) => (
              <div className="checkbox-dropdown-item-container" key={option}>
                <input
                  type="checkbox"
                  value={option}
                  checked={option === selected}
                  onClick={() => handleOptionClick(option)}
                />
                <div className="checkbox-dropdown-item">{option}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CheckboxDropdown;
