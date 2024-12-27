import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from "@mui/material";

const PublicCalendar = () => {
  const [manchesterDates, setManchesterDates] = useState([]);
  const [redLionDates, setRedLionDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentStore, setCurrentStore] = useState(""); // Manchester or Red Lion
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedHours, setSelectedHours] = useState(null);

  useEffect(() => {
    fetchUnavailableDates();
  }, []);

  const fetchUnavailableDates = async () => {
    try {
      const [manchesterResponse, redLionResponse] = await Promise.all([
        axios.get("https://mlr-backend.vercel.app/api/dates"),
        axios.get("https://mlr-backend.vercel.app/api/rldates")
      ]);

      setManchesterDates(manchesterResponse.data);
      setRedLionDates(redLionResponse.data);
    } catch (error) {
      console.error("Error fetching dates:", error);
    }
  };

  const handleDateClick = (date, store) => {
    setSelectedDate(date);
    setCurrentStore(store);

    const storeDates = store === "Manchester" ? manchesterDates : redLionDates;
    const dateFound = storeDates.find(
      (d) => new Date(d.date).toDateString() === date.toDateString()
    );
    if (dateFound) {
      setSelectedHours(dateFound.hours);
    } else {
      setSelectedHours(null);
    }
    setOpenDialog(true);
  };

  const getTileContent = (date, store) => {
    const storeDates = store === "Manchester" ? manchesterDates : redLionDates;
    const dateFound = storeDates.find(
      (d) => new Date(d.date).toDateString() === date.toDateString()
    );
    return dateFound ? (
      <CheckIcon
        style={{
          color: store === "Manchester" ? "green" : "green",
          fontSize: "1rem"
        }}
      />
    ) : null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      // Check for Manchester dates only for the Manchester calendar
      if (currentStore === "Manchester") {
        const isManchesterUnavailable = manchesterDates.some(
          (d) => new Date(d.date).toDateString() === date.toDateString()
        );
        if (isManchesterUnavailable) {
          return "react-calendar__tile--unavailable manchester"; // Apply the 'manchester' class
        }
      }

      // Check for Red Lion dates only for the Red Lion calendar
      if (currentStore === "Red Lion") {
        const isRedLionUnavailable = redLionDates.some(
          (d) => new Date(d.date).toDateString() === date.toDateString()
        );
        if (isRedLionUnavailable) {
          return "react-calendar__tile--unavailable redlion"; // Apply the 'redlion' class
        }
      }
    }
  };

  return (
    <div className="consign-container">
      <h2>Click Dates to See Walk-In Times</h2>
      <div className="calendar-wrapper">
        <div className="calendar-container">
          <h3>Manchester</h3>
          <Calendar
            onClickDay={(date) => handleDateClick(date, "Manchester")}
            tileClassName={tileClassName}
            tileContent={({ date, view }) =>
              view === "month" && getTileContent(date, "Manchester")
            }
          />
        </div>
        <div className="calendar-container">
          <h3>Red Lion</h3>
          <Calendar
            onClickDay={(date) => handleDateClick(date, "Red Lion")}
            tileClassName={tileClassName}
            tileContent={({ date, view }) =>
              view === "month" && getTileContent(date, "Red Lion")
            }
          />
        </div>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {currentStore} - {selectedDate && selectedDate.toDateString()}
        </DialogTitle>
        <DialogContent>
          <p>Drop-Off Hours for the selected date:</p>
          <p>
            {selectedHours ? selectedHours : "No drop-off times for this date"}
          </p>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PublicCalendar;
