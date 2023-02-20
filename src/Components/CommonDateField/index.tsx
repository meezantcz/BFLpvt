import React from "react";
import { useState } from "react";
import Calendar from "../../Assets/Images/calendar.svg";

import DatePicker from "react-datepicker";
import { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import { useLocation } from "react-router-dom";

interface Props {
  inputName: string;
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  isError?: boolean;
  isRequired: boolean;
  rightSpace?: boolean;
}

interface MyContainerProps {
  inputName: string;
  className?: string;
  children?: React.ReactNode;
}

const MyContainer: React.FC<MyContainerProps> = ({
  inputName,
  className,
  children,
}) => {
  return (
    <div style={{ padding: "0px" }}>
      <CalendarContainer className={className}>
        <div className="date-header-title">
          {inputName}
          <p>Lorem ipsum dolor, sit ametlorem loren anditiis.</p>
        </div>
        <div style={{ position: "relative" }}>{children}</div>
      </CalendarContainer>
    </div>
  );
};

const CommonDateField: React.FC<Props> = ({
  date,
  setDate,
  inputName,
  isError,
  isRequired,
  rightSpace,
}) => {
  const renderCustomHeader = (props: any) => {
    return (
      <div className="date-header-container">
        <div className="date-header-title">{inputName}</div>
        <p>Lorem, ipsum dolor sit amet consectetu Eveniet</p>
      </div>
    );
  };

  const { pathname } = useLocation();

  return (
    <div className="App">
      <div
        className={`input-label ${isRequired ? "date-required" : ""}`}
        style={{ paddingLeft: "10px" }}
      >
        {inputName}
      </div>
      <div
        className="date-container"
        style={{
          width: `${
            pathname === "/createoffer/web" || pathname === "/createoffer/app"
              ? "270px"
              : "290px"
          }`,
        }}
      >
        <div className="input-field">
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd/MM/yy"
            placeholderText="Select a date"
            minDate={
              inputName === "Campaign Start Date" ? new Date() : new Date()
            }
            className={`date-picker ${isError ? "red-border" : ""}`}
            calendarContainer={(props) => (
              <MyContainer {...props} inputName={inputName} />
            )}
          />
        </div>
        <div className="calendar-icon">
          <img src={Calendar} alt="calendar" />
        </div>
      </div>
    </div>
  );
};

export default CommonDateField;
