import React, { useState } from "react";

const DateInputDisplay = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <h3>Selected Date: {selectedDate}</h3>
      <div>
        <label htmlFor="dateInput">Select a Date:</label>
        <input
          type="date"
          id="dateInput"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default DateInputDisplay;
