import React from "react";
import ColorButton from "../ColorButton";
import TransparentButtons from "../TransparentButtons";
import "./styles.scss";

interface Props {
  onCreate: () => void;
  onSaveDraft: () => void;
}

const CreateOfferFooter: React.FC<Props> = ({ onCreate, onSaveDraft }) => {
  return (
    <div className="create-offer-footer">
      <div className="save-draft-footer-btn">
        <TransparentButtons
          buttonName="Save to Draft"
          width="150px"
          onClick={onSaveDraft}
        />
      </div>
      <div className="create-footer-btn">
        <ColorButton width="150px" buttonName="Create" onClick={onCreate} />
      </div>
    </div>
  );
};

export default CreateOfferFooter;
