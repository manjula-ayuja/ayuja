




import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  MenuItem,
  Grid,
} from "@mui/material";
import Footer from "../Common/Footer";
const BookAppointment = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    service: "",
    time: "",
    paymentMethod: "",
    upiApp: "",     // 🔹 new field
    cardType: "",   // 🔹 new field
    prescriptions: [],
    terms: false,
  });

  const bookAppointmentApi = process.env.REACT_APP_BOOK_APPOINTMENT_API;
  const prescriptionApi = process.env.REACT_APP_PRESCRIPTION_STORE_API;


  const fieldStyle = {
    width: "48%",
    marginBottom: "16px",
  };


  const services = [
    "Elderly and Childcare",
    "Nursing & Physiotherapy Services",
    "Medicine & Diagnostic Delivery",
    "Emergency Care Support",
    "Doctor Visit, Pickup & Drop",
    "Social Wellness Activities",
  ];

  // Payment Options
  const paymentMethods = [
    { label: "Card", value: "card" },
    { label: "UPI", value: "upi" },
    { label: "Pay at Clinic", value: "offline" },
  ];

  const upiOptions = [
    { label: "Paytm", value: "paytm" },
    { label: "Google Pay", value: "gpay" },
    { label: "PhonePe", value: "phonepe" },
  ];

  const cardOptions = [
    { label: "Credit Card", value: "credit" },
    { label: "Debit Card", value: "debit" },
  ];

  const gender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.gender || !formData.age || !formData.service || !formData.time) {
      alert("Gender, Service and Time are mandatory fields.");
      return;
    }

    try {
      // 1️⃣ Build payment object
      const paymentData = {
        amount: 500, // 💰 you can make this dynamic
        method: formData.paymentMethod || "offline",
        status: "success",
        details:
          formData.paymentMethod === "upi"
            ? { upiApp: formData.upiApp }
            : formData.paymentMethod === "card"
            ? { cardType: formData.cardType }
            : {},
        transaction_history: [
          { timestamp: new Date().toISOString(), method: formData.paymentMethod },
        ],
      };



// 1️⃣ Process payment first
const paymentRes = await fetch("http://localhost:5001/api/flask/booking/process-payment", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    method: formData.paymentMethod,
    details: formData.paymentMethod === "upi"
      ? { upiApp: formData.upiApp }
      : formData.paymentMethod === "card"
      ? { cardType: formData.cardType }
      : {},
  }),
});

const paymentResult = await paymentRes.json();

if (paymentResult.status !== "success") {
  alert("Payment failed. Try again.");
  return;
}



      // 2️⃣ Build booking payload
      const bookingPayload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        gender: formData.gender,
        service_type: formData.service,
        date: formData.time,
        notes: "Uploaded via frontend form",
        payment: paymentData,
      };

      // 3️⃣ Book appointment
      const res = await fetch(bookAppointmentApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      const bookingData = await res.json();

      if (!res.ok) {
        alert(bookingData.error || "Failed to book appointment");
        return;
      }

      const bookingId = bookingData.booking_id;
      console.log("✅ Booking created:", bookingId);

      // 4️⃣ Upload prescriptions
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

      alert(
        `Appointment booked successfully!\n\nName: ${formData.fullName}\nTime: ${formData.time}`
      );

      // 5️⃣ Reset the form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        service: "",
        time: "",
        paymentMethod: "",
        upiApp: "",
        cardType: "",
        prescriptions: [],
        terms: false,
      });
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong while booking.");
    }
  };

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

  return (
    <>
    <Box sx={{ pb: 10}}>
  
       <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      px: 2,mt: 4, 
    }}
  >
        <Box
      sx={{
        backgroundColor: "#075372",
        color: "#fff",
        p: 3,
        borderRadius: "30px",
        boxShadow: 5,
        maxWidth: "700px",
        width: "100%",
      }}
    >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 ,textAlign:"center"}}>
          Book Appointment
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2%" }}>
          <TextField
            name="fullName"
            label="Full Name"
            variant="outlined"
            value={formData.fullName}
            onChange={handleChange}
            sx={{ ...fieldStyle, backgroundColor: "#fff", borderRadius: 4 }}
          />

          <TextField
            name="email"
            label="Email *"
            variant="outlined"
            required
            value={formData.email}
            onChange={handleChange}
            sx={{ ...fieldStyle, backgroundColor: "#fff", borderRadius: 4 }}
          />

          <TextField
            name="phone"
            label="Phone *"
            variant="outlined"
            required
            value={formData.phone}
            onChange={handleChange}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            sx={{ ...fieldStyle, backgroundColor: "#fff", borderRadius: 4 }}
          />

          <TextField
            name="age"
            label="Age *"
            variant="outlined"
            required
            type="number"
            value={formData.age}
            onChange={handleChange}
            sx={{ ...fieldStyle, backgroundColor: "#fff", borderRadius: 4 }}
          />

          <TextField
            select
            label="Gender *"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ ...fieldStyle, backgroundColor: "#fff", borderRadius: 4 }}
          >
            {gender.map((g, i) => (
              <MenuItem key={i} value={g.value}>
                {g.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Service *"
            name="service"
            value={formData.service}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ ...fieldStyle, backgroundColor: "#fff", borderRadius: 4 }}
          >
            {services.map((s, i) => (
              <MenuItem key={i} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="time"
            type="datetime-local"
            label="Appointment Time *"
            value={formData.time}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ ...fieldStyle, backgroundColor: "#fff", borderRadius: 4 }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: new Date().toISOString().slice(0, 16) }}
          />

          <TextField
            select
            label="Payment Method"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ ...fieldStyle, backgroundColor: "#fff", borderRadius: 4 }}
          >
            {paymentMethods.map((method, i) => (
              <MenuItem key={i} value={method.value}>
                {method.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Select UPI App"
            name="upiApp"
            value={formData.upiApp}
            onChange={handleChange}
            variant="outlined"
            disabled={formData.paymentMethod !== "upi"}
            sx={{ ...fieldStyle, backgroundColor: "#fff", borderRadius: 4 }}
          >
            {upiOptions.map((upi, i) => (
              <MenuItem key={i} value={upi.value}>
                {upi.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Select Card Type"
            name="cardType"
            value={formData.cardType}
            onChange={handleChange}
            variant="outlined"
            disabled={formData.paymentMethod !== "card"}
            sx={{ ...fieldStyle, backgroundColor: "#fff", borderRadius: 4 }}
          >
            {cardOptions.map((card, i) => (
              <MenuItem key={i} value={card.value}>
                {card.label}
              </MenuItem>
            ))}
          </TextField>



      <Box sx={{ width: "100%", backgroundColor: "#fff", borderRadius: 4, p: 1 }}>
        <input
          type="file"
          name="prescriptions"
          multiple
          accept="image/*,.pdf"
          onChange={handleChange}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
          }}
        />

        {formData.prescriptions.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" color="#000">
              Selected Files:
            </Typography>
            <ul style={{color:"black"}}>
              {formData.prescriptions.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </Box>
        )}
      </Box>



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
            sx={{ width: "100%" }}
          />
        </Box>

        <Box textAlign="center" mt={2}>
          <Button
            type="submit"
            variant="contained"
            // fullWidth
            sx={{
              backgroundColor: "#66f2a7",
              color: "#003333",
              fontWeight: "bold",
              borderRadius: "8px",width:"50%",
              py: 1.2,
              "&:hover": { backgroundColor: "#55d792" },
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>
      </Box>
    </Box>
    <Footer/>
    </>
  );
};

export default BookAppointment;



