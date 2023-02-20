import React from "react";
import "./styles.scss";

interface Props {
  name: string;
  isRequired: boolean;
  type: any;
  placeholder: string;
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  width: string;
  margin: string;
  isError?: boolean;
  rightSpace?: boolean;
  maxlength?: number;
}

const CommonInputField: React.FC<Props> = ({
  name,
  isRequired,
  type,

  placeholder,
  value,
  setValue,
  width,
  margin,
  isError,
  rightSpace,
  maxlength,
}) => {
  return (
    <>
      <div className="input-fields">
        <div
          className={isRequired ? "required-fields" : "not-required"}
          style={{ margin: margin }}
        >
          <span className="input-label" style={{ paddingLeft: "10px" }}>
            {name}
          </span>
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          maxLength={maxlength}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          max={type === "number" ? 1 : undefined}
          style={{
            width: width,
            border: isError
              ? "1px solid #FF5274"
              : "1px solid rgb(230,234,246)",
          }}
          className={`common-input ${rightSpace && "extra_right_margin"}`}
        />
      </div>
    </>
  );
};

export default CommonInputField;
