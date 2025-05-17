import React from "react";
import moment from "jalali-moment";
import { vazirFD } from "../fonts/font";

const DateShow = ({ date, lang = "fa" }) => {
  const formattedDate = moment(date)
    .locale(lang === "fa" ? "fa" : "en")
    .format("D MMM YYYY");
  return (
    <span className={`${lang === "en" ? "" : vazirFD.className} shrink-0`}>
      {formattedDate}
    </span>
  );
};

export default DateShow;
