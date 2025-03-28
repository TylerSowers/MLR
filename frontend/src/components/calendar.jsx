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
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";

const LiveCalendar = ({ token }) => {
  const [manchesterDates, setManchesterDates] = useState([]);
  const [redLionDates, setRedLionDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentStore, setCurrentStore] = useState(""); // Manchester or Red Lion
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedHours, setSelectedHours] = useState("9:00AM - 6:00PM"); // Default hours

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
    setOpenDialog(true);
  };

  const handleAddDate = async () => {
    const endpoint =
      currentStore === "Manchester" ? "/api/dates" : "/api/rldates";
    const dateToAdd = selectedDate;

    try {
      await axios.post(
        `https://mlr-backend.vercel.app${endpoint}`,
        { date: dateToAdd, hours: selectedHours },
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`
          }
        }
      );

      if (currentStore === "Manchester") {
        setManchesterDates((prevDates) => [
          ...prevDates,
          { date: dateToAdd, hours: selectedHours }
        ]);
      } else {
        setRedLionDates((prevDates) => [
          ...prevDates,
          { date: dateToAdd, hours: selectedHours }
        ]);
      }
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding date:", error);
    }
  };

  const handleRemoveDate = async () => {
    const endpoint =
      currentStore === "Manchester" ? "/api/dates" : "/api/rldates";
    const dateToRemove = selectedDate;

    try {
      await axios.delete(`https://mlr-backend.vercel.app${endpoint}`, {
        data: { date: dateToRemove },
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem("token")}`
        }
      });

      if (currentStore === "Manchester") {
        setManchesterDates((prevDates) =>
          prevDates.filter(
            (d) => new Date(d.date).getTime() !== dateToRemove.getTime()
          )
        );
      } else {
        setRedLionDates((prevDates) =>
          prevDates.filter(
            (d) => new Date(d.date).getTime() !== dateToRemove.getTime()
          )
        );
      }
      setOpenDialog(false);
    } catch (error) {
      console.error("Error removing date:", error);
    }
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

  const getDialogOptions = () => {
    // Only proceed if selectedDate is not null
    if (!selectedDate) {
      return null; // You can return a loading or error message here if needed
    }

    const storeDates =
      currentStore === "Manchester" ? manchesterDates : redLionDates;
    const dateAlreadyExists = storeDates.some(
      (d) => new Date(d.date).toDateString() === selectedDate.toDateString()
    );

    return dateAlreadyExists ? (
      <DialogActions>
        <Button onClick={handleRemoveDate}>Delete</Button>
        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
      </DialogActions>
    ) : (
      <>
        <FormControl fullWidth>
          <InputLabel>Drop-Off Hours</InputLabel>
          <Select
            value={selectedHours}
            onChange={(e) => setSelectedHours(e.target.value)}
          >
            <MenuItem value="9:00AM - 6:45PM">9:00AM - 6:45PM</MenuItem>
            <MenuItem value="9:00AM - 3:45PM">9:00AM - 3:45PM</MenuItem>
            <MenuItem value="9:00AM - 5:30PM">9:00AM - 5:30PM</MenuItem>
            <MenuItem value="9:30AM - 5:30PM">9:30AM - 5:30PM</MenuItem>
          </Select>
        </FormControl>
        <DialogActions>
          <Button onClick={handleAddDate}>Add</Button>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        </DialogActions>
      </>
    );
  };

  return (
    <div className="consign-container">
      <h2>Manage Walk-In Dates</h2>
      <div className="calendar-wrapper">
        <div className="calendar-container">
          <h3>Manchester</h3>
          <Calendar
            onClickDay={(date) => handleDateClick(date, "Manchester")}
            tileClassName={tileClassName}
            tileContent={({ date, view }) =>
              view === "month" && getTileContent(date, "Manchester")
            }
            locale="en-US" // Set the first day of the week to Sunday
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
            locale="en-US" // Set the first day of the week to Sunday
          />
        </div>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {currentStore} - {selectedDate && selectedDate.toDateString()}
        </DialogTitle>
        <DialogContent>
          <p>Choose an option for the selected date:</p>
          {getDialogOptions()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LiveCalendar;
