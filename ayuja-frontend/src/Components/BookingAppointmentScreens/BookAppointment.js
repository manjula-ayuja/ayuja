
import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "", 
    service: "",
    time: "",
    prescriptions: [],
    terms: false,
  });
  const bookAppointmentApi = process.env.REACT_APP_BOOK_APPOINTMENT_API;
  const prescriptionApi = process.env.REACT_APP_PRESCRIPTION_STORE_API;

  const services = [
    "Elderly and Childcare",
    "Nursing & Physiotherapy Services",
    "Medicine & Diagnostic Delivery",
    "Emergency Care Support",
    "Doctor Visit, Pickup & Drop",
    "Social Wellness Activities",
  ];

  const roles = [
    { label: "Resident", value: "resident" },
    { label: "Others", value: "other" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? Array.from(files)
          : value,
    });
  };
 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.role || !formData.service || !formData.time) {
      alert("Role, Service and Time are mandatory fields.");
      return;
    }
  
    try {
      // 1️⃣ Book appointment
      const res = await fetch(bookAppointmentApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          service_type: formData.service,
          date: formData.time,
          notes: "Uploaded via frontend form",
        }),
      });
  
      const bookingData = await res.json();
  
      if (!res.ok) {
        alert(bookingData.error || "Failed to book appointment");
        return;
      }
  
      const bookingId = bookingData.booking_id;
      console.log("✅ Booking created:", bookingId);
  
      // 2️⃣ Upload prescriptions
      if (formData.prescriptions.length > 0) {
        for (const file of formData.prescriptions) {
          const formDataObj = new FormData();
          formDataObj.append("file", file);
  
          const uploadRes = await fetch(`${prescriptionApi}/${bookingId}`, {
            method: "POST",
            body: formDataObj,
          });
  
          const uploadData = await uploadRes.json();
  
          if (uploadRes.ok) {
            console.log("📄 Prescription uploaded:", uploadData.file_path);
          } else {
            console.error("❌ Upload failed:", uploadData.error);
          }
        }
      }
      alert("Appointment booked successfully!");
  
      // 3️⃣ Reset the form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        role: "",
        service: "",
        time: "",
        prescriptions: [],
        terms: false,
      });
  
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong while booking.");
    }
  };
  
  return (
    <Box sx={{ pb: 100 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "auto",
          width: 350,
          backgroundColor: "#075372",
          color: "#fff",
          p: 3,
          borderRadius: "30px",
          boxShadow: 5,
          mb: 200,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
          Book Appointment
        </Typography>

        {/* Full Name */}
        <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
          Full Name
        </Typography>
        <TextField
          name="fullName"
          placeholder="Enter Your Full Name"
          variant="outlined"
          fullWidth
          value={formData.fullName}
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
        />

        {/* Email */}
        <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
          Email Address
        </Typography>
        <TextField
          name="email"
          placeholder="Enter Your Email Address"
          variant="outlined"
          fullWidth
          required
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
        />

        {/* Phone */}
        <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
          Phone
        </Typography>
        <TextField
          name="phone"
          placeholder="Enter Your Mobile Number"
          variant="outlined"
          fullWidth
          required
          value={formData.phone}
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
        />

        {/* Role Selection */}
        <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
          Select Role *
        </Typography>
        <TextField
          select
          label="Please select role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
        >
          {roles.map((role, index) => (
            <MenuItem key={index} value={role.value}>
              {role.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Service Selection */}
        <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
          Select Service *
        </Typography>
        <TextField
          select
          label="Please select service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
        >
          {services.map((service, index) => (
            <MenuItem key={index} value={service}>
              {service}
            </MenuItem>
          ))}
        </TextField>

        {/* Time Selection */}
        <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
          Appointment Time *
        </Typography>
        <TextField
          name="time"
          type="datetime-local"
          value={formData.time}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: new Date().toISOString().slice(0, 16), 
          }}
        />
        {/* Prescription Upload */}
         <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
          Upload Prescriptions
        </Typography>
          <TextField
            type="file"
            name="prescriptions"
            inputProps={{ multiple: true, accept: "image/*,.pdf" }}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
            value="" 
          />

          {formData.prescriptions.length > 0 && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              {formData.prescriptions.length} file(s) selected
            </Typography>
          )}


        {/* Terms */}
        <FormControlLabel
          control={
            <Checkbox
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
              sx={{ color: "white" }}
            />
          }
          label={
            <Typography variant="body2">
              I accept all{" "}
              <span style={{ color: "#4caf50" }}>terms and conditions</span>
            </Typography>
          }
        />

        {/* Submit Button */}
        <Box textAlign="center" mt={2}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#66f2a7",
              color: "#003333",
              fontWeight: "bold",
              borderRadius: "8px",
              py: 1.2,
              "&:hover": { backgroundColor: "#55d792" },
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BookAppointment;
