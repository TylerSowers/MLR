import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import axios from "axios";

const Consign = ({ token }) => {
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    fetchUnavailableDates();
  }, []);

  const fetchUnavailableDates = async () => {
    try {
      const response = await axios.get(
        "https://mlr-backend.vercel.app/api/dates"
      );
      setUnavailableDates(response.data.map((item) => new Date(item.date)));
    } catch (error) {
      console.error("Error fetching dates:", error);
    }
  };

  const handleDateClick = async (date) => {
    try {
      await axios.post(
        "https://mlr-backend.vercel.app/api/dates",
        { date },
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`
          }
        }
      );
      fetchUnavailableDates();
    } catch (error) {
      console.error("Error updating date:", error);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const isUnavailable = unavailableDates.some(
        (d) => new Date(d).getTime() === date.getTime()
      );
      return isUnavailable ? "react-calendar__tile--unavailable" : null;
    }
  };

  return (
    <div className="consign-container">
      <h2>Walk-In Dates Highlighted in Green</h2>
      <Calendar onClickDay={handleDateClick} tileClassName={tileClassName} />
    </div>
  );
};

export default Consign;
