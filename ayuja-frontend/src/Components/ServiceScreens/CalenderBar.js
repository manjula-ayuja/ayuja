


import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const years = Array.from({ length: 30 }, (_, i) => 2020 + i);
const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, "0"));

const CalenderBar = ({ onDateChange }) => {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [days, setDays] = useState([]);

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("month");

  const [selectedHour, setSelectedHour] = useState(today.getHours().toString().padStart(2, "0"));
  const [selectedMinute, setSelectedMinute] = useState(
    (Math.floor(today.getMinutes() / 5) * 5).toString().padStart(2, "0")
  );

  useEffect(() => {
    const formattedDate = `${selectedDate} ${months[selectedMonth]} ${selectedYear} ${selectedHour}:${selectedMinute}`;
    onDateChange?.(formattedDate);
  }, [selectedDate, selectedMonth, selectedYear, selectedHour, selectedMinute]);

  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const tempDays = [];
    const todayDate = today.getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const dayName = ["SUN","MON","TUE","WED","THU","FRI","SAT"][
        new Date(selectedYear, selectedMonth, i).getDay()
      ];

      if (
        selectedYear > today.getFullYear() ||
        (selectedYear === today.getFullYear() &&
          (selectedMonth > today.getMonth() ||
            (selectedMonth === today.getMonth() && i >= todayDate)))
      ) {
        tempDays.push({ day: dayName, date: i });
      }
    }

    setDays(tempDays);
    if (selectedDate && !tempDays.find(d => d.date === selectedDate)) {
      setSelectedDate(tempDays.length ? tempDays[0].date : null);
    }
  }, [selectedMonth, selectedYear]);

  const handleOpenModal = (type) => {
    setModalType(type);
    setOpen(true);
  };

  return (
    <Box sx={{ mt: 2, mb: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>Schedule</Typography>
        <Button endIcon={<ArrowDropDownIcon />} onClick={() => handleOpenModal("month")}>
          {months[selectedMonth]} {selectedYear}
        </Button>
      </Box>

      {/* Days Row */}
      <Box sx={{ display: "flex", overflowX: "auto", gap: 2, pb: 1 }}>
        {days.map(item => {
          const isSelected = selectedDate === item.date;
          return (
            <Box
              key={item.date}
              onClick={() => {
                setSelectedDate(item.date);
                handleOpenModal("time");
              }}
              sx={{
                cursor: "pointer",
                border: "1px solid",
                borderColor: isSelected ? "teal" : "grey.400",
                bgcolor: isSelected ? "teal" : "transparent",
                color: isSelected ? "white" : "black",
                borderRadius: 2,
                px: 2,
                py: 1,
                textAlign: "center",
                minWidth: 60,
              }}
            >
              <Typography variant="body2" fontWeight={600}>{item.day}</Typography>
              <Typography variant="body1" fontWeight={600}>{item.date}</Typography>
            </Box>
          );
        })}
      </Box>

      {/* Show Selected Time */}
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="h6" fontWeight={700}>
          Selected Time: {selectedHour}:{selectedMinute}
        </Typography>
      </Box>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          width: 320,
          maxHeight: 400,
          p: 3,
          overflow: "auto",
        }}>
          {modalType === "month" && (
            <>
              <Typography variant="h6" fontWeight={700} mb={2}>Select Month</Typography>
              <List>
                {months.map((m, idx) => {
                  if (selectedYear > today.getFullYear() || (selectedYear === today.getFullYear() && idx >= today.getMonth())) {
                    return (
                      <ListItem key={m} disablePadding>
                        <ListItemButton onClick={() => { setSelectedMonth(idx); setOpen(false); }}>
                          <ListItemText primary={m} />
                        </ListItemButton>
                      </ListItem>
                    );
                  }
                  return null;
                })}
              </List>
            </>
          )}

          {modalType === "time" && (
            <>
              <Typography variant="h6" fontWeight={700} mb={2}>Select Time</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Hours */}
                <List sx={{ maxHeight: 300, overflow: "auto", flex: 1 }}>
                  {hours.map(h => (
                    <ListItem key={h} disablePadding>
                      <ListItemButton onClick={() => setSelectedHour(h)}>
                        <ListItemText primary={h} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>

                {/* Minutes */}
                <List sx={{ maxHeight: 300, overflow: "auto", flex: 1 }}>
                  {minutes.map(m => (
                    <ListItem key={m} disablePadding>
                      <ListItemButton onClick={() => { setSelectedMinute(m); setOpen(false); }}>
                        <ListItemText primary={m} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </>
          )}

          <Button fullWidth variant="contained" sx={{ mt: 2, bgcolor: "teal" }} onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CalenderBar;
