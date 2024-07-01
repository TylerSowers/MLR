import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import axios from "axios";

const Consign = ({ token, isAdmin }) => {
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    fetchUnavailableDates();
  }, []);

  const fetchUnavailableDates = async () => {
    try {
      const response = await axios.get("http://10.0.0.181:5000/api/dates");
      setUnavailableDates(response.data.map((item) => new Date(item.date)));
    } catch (error) {
      console.error("Error fetching dates:", error);
    }
  };

  const handleDateClick = async (date) => {
    try {
      const isUnavailable = unavailableDates.some(
        (d) => new Date(d).getTime() === date.getTime()
      );

      // Toggle availability
      await axios.post(
        "http://localhost:5000/api/dates",
        { date },
        {
          headers: { Authorization: token }
        }
      );

      // Fetch updated unavailable dates after modification
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

      return isUnavailable
        ? isAdmin
          ? "react-calendar__tile--unavailable admin"
          : "react-calendar__tile--unavailable"
        : null;
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
