import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Container,
  Paper,MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import CalenderBar from "./CalenderBar"; 

const CommonFieldsScreen = ({ serviceData }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // service details (from props or navigation)
  const serviceTitle =
    serviceData?.serviceTitle || location.state?.serviceTitle;
  const serviceImage =
    serviceData?.serviceImage || location.state?.serviceImage;


  const validateName = (value) => /^[A-Za-z\s]+$/.test(value);
  const validateDOB = (value) =>
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value);
  const validatePhone = (value) => /^[0-9]{10}$/.test(value);

  const handleContinue = () => {
    if (!validateName(name)) {
      alert("Name should contain only alphabets!");
      return;
    }
    if (!validateDOB(dob)) {
      alert("Date of Birth should be in DD/MM/YYYY format!");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits!");
      return;
    }
    if (!gender) {
      alert("Please select gender!");
      return;
    }
    if (!selectedDate) {
      alert("Please select a date!");
      return;
    }

    navigate("/select-payment-method", {
      state: {
        name,
        dob,
        phone,
        gender,
        selectedDate,
        serviceTitle,
        serviceImage,
      },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        {/* Schedule */}
        <Box mb={3}>
          <CalenderBar onDateChange={setSelectedDate} />
        </Box>

        {/* Form */}
        <Box>
          <Typography fontWeight={600} fontSize={14} mb={1}>
            Name*
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography fontWeight={600} fontSize={14} mt={3} mb={1}>
            Date of Birth*
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="DD/MM/YYYY"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <Typography fontWeight={600} fontSize={14} mt={3} mb={1}>
            Phone Number*
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="9876543210"
            type="tel"
            value={phone}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                setPhone(e.target.value);
              }
            }}
            inputProps={{ maxLength: 10 }}
          />

          <Typography fontWeight={600} fontSize={14} mt={3} mb={1}>
            Gender
          </Typography>
          <TextField
          label="Select a Option"
            select
            fullWidth
            size="small"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="" disabled>
                <em>Select a Option</em>
              </MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
        </Box>

        {/* Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 4, py: 1.5, borderRadius: 2, bgcolor: "teal" }}
          onClick={handleContinue}
        >
          Save & Continue
        </Button>
      </Paper>
    </Container>
  );
};

export default CommonFieldsScreen;
