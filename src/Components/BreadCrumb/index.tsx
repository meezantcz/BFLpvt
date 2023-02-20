import React from "react";
import "./styles.scss";

interface Props {
  to: string;
  from: string;
}

const BreadCrumb: React.FC<Props> = ({ to, from }) => {
  return (
    <div className="breadcrumb-container">
      <div className="grey-heading">{from}</div>
      <div className="arrow-sign">{">"}</div>
      <div className="heading3">{to}</div>
    </div>
  );
};

export default BreadCrumb;
