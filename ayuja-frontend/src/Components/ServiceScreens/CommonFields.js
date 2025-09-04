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
  const [gender, setGender] = useState("");
  const [prescription ,setPrescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // service details (from props or navigation)
  const serviceTitle =
    serviceData?.serviceTitle || location.state?.serviceTitle;
  const serviceImage =
    serviceData?.serviceImage || location.state?.serviceImage;


  const validateName = (value) => /^[A-Za-z\s]+$/.test(value);


  const handleContinue = () => {
    if (!validateName(name)) {
      alert("Name should contain only alphabets!");
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
      // 🔹 Get logged-in user details from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

    navigate("/select-payment-method", {
      state: {
        name,
        dob,
        gender,
        selectedDate,
        serviceTitle,
        serviceImage,
        prescription,
        storedUser,
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
            Age
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter The patient Age"
            value={dob}
            type="number"
            onChange={(e) => setDob(e.target.value)}
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

        <Typography fontWeight={600} fontSize={14} mt={3} mb={1}>
          Upload Prescriptions
        </Typography>
        <TextField
          type="file"
          name="prescription"
          inputProps={{ multiple: true, accept: "image/*,.pdf" }}
          onChange={(e) => setPrescription(Array.from(e.target.files))}
          variant="outlined"
          fullWidth
          sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
        />

        {/* Show selected files */}
        {prescription.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" fontWeight={600} mb={1}>
              Selected Files:
            </Typography>
            {prescription.map((file, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                📄 {file.name}
              </Typography>
            ))}
          </Box>
        )}

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
