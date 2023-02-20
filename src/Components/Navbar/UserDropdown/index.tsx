import React, { useState } from "react";
import { userDropDownItems } from "../userDropdownItems";
import { Link } from "react-router-dom";
import "./styles.scss";
const UserDropdown = () => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <>
      <ul
        className={dropdown ? "user-dropdown clicked" : "user-dropdown"}
        onClick={() => setDropdown(!dropdown)}
      >
        {userDropDownItems.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className={item.cName}
                onClick={() => setDropdown(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UserDropdown;
