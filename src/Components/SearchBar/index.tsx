import React from "react";
import { BiSearch } from "react-icons/bi";
import "./index.scss";

interface Props {
  placeholder: string;
  width: string;
}

const SearchBar: React.FC<Props> = ({ placeholder, width }) => {
  return (
    <>
      <div className="search" style={{ width: width }}>
        <div className="searchInputs">
          <input type="text" placeholder={placeholder} />
          <div className="searchIcon">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
