import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Container,
  Paper,
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

  const handleContinue = () => {
    if (!name || !dob || !phone || !selectedDate) {
      alert("Please fill all required fields!");
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
            placeholder="+91 9876543210"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Typography fontWeight={600} fontSize={14} mt={3} mb={1}>
            Gender
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Male / Female"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
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
