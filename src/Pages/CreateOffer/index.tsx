import { useState } from "react";
import BreadCrumb from "../../Components/BreadCrumb";
import CreateOfferFooter from "../../Components/CreateOfferFooter";
import CreateOfferApp from "../CreateOfferApp";
import CreateOfferWeb from "../CreateOfferWeb";
import "./styles.scss";

const CreateOffer = () => {
  const [web, setWeb] = useState<boolean>(true);
  const [app, setApp] = useState<boolean>(false);

  const onCreateOfferWeb = () => {
    setWeb(true);
    setApp(false);
  };

  const onCreateOfferApp = () => {
    setApp(true);
    setWeb(false);
  };
  return (
    <>
      <BreadCrumb from="Dashboard" to="Create Offer" />
      <div className="create-offer-display">
        <div className="create-offer-title">
          <h3>Create Offer</h3>
        </div>
        <div className="create-offer-tabs">
          <div
            className={`create-offer-web-component ${web ? "active" : ""}`}
            onClick={onCreateOfferWeb}
          >
            Web
          </div>
          <div
            className={`create-offer-app-component ${app ? "active" : ""}`}
            onClick={onCreateOfferApp}
          >
            App
          </div>
        </div>
        {web ? (
          <>
            <CreateOfferWeb />
          </>
        ) : (
          <>
            <CreateOfferApp />
          </>
        )}
      </div>
      {/* <CreateOfferFooter /> */}
    </>
  );
};

export default CreateOffer;
