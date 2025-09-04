import React, { useState } from "react";
import {
  Box,IconButton,
  Typography,
  Button,
  Paper,
  Radio,
  Stack,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useNavigate ,useLocation} from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Footer from "../Common/Footer"
const paymentOptions = [
  { id: "1", label: "Ayuja Wallet", type: "wallet", icon: <AccountBalanceWalletIcon sx={{ color: "#008080" }} /> },
  { id: "2", label: "**** **** **** 1234", type: "visa", icon: <CreditCardIcon sx={{ color: "#1A1F71" }} /> },
  { id: "3", label: "**** **** **** 1234", type: "mastercard", icon: <CreditCardIcon sx={{ color: "#EB001B" }} /> },
  { id: "4", label: "UPI", type: "upi", icon: <PaymentIcon sx={{ color: "#008080" }} /> },
  { id: "5", label: "Pay At Clinic", type: "offline", icon: <LocalHospitalIcon sx={{ color: "#008080" }} /> },
];

const PaymentMethodSelection = ({ routeParams }) => {
  const [selected, setSelected] = useState("1");
  const navigate = useNavigate();

  const location = useLocation();
  const bookAppointmentApi = process.env.REACT_APP_BOOK_APPOINTMENT_API;
  const prescriptionApi = process.env.REACT_APP_PRESCRIPTION_STORE_API;
  const {
    name,
    dob,
    phone,
    gender,
    selectedDate,
    serviceTitle,
    serviceImage,storedUser,prescription
  } = location.state || {};  

  const handleContinue = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  
    // Map selected option to payment method
    let paymentMethod = "upi";
    if (selected === "1") paymentMethod = "wallet";
    else if (selected === "2" || selected === "3") paymentMethod = "card";
    else if (selected === "4") paymentMethod = "upi";
    else if (selected === "5") paymentMethod = "offline";
  
    // Build payment object
    const paymentData = {
      amount: 500,
      method: paymentMethod,
      status: "success", // assuming success for now
      transaction_history: [
        { timestamp: new Date().toISOString(), method: paymentMethod },
      ],
    };
  
    // ✅ Ensure selectedDate is ISO string
    let isoDate = selectedDate;
    if (selectedDate) {
      // isoDate = new Date(selectedDate).toISOString();
      isoDate = new Date(selectedDate).toISOString().replace("Z", "");

    }


    // Build booking payload

    const bookingData = {
      name,
      email: storedUser.email,
      phone: storedUser.phone,
      gender,
      age: dob,
      service_type: serviceTitle,
      date: isoDate,  
      notes: "",
      payment: paymentData,
      prescription,
    };

  
    try {
      // 1️⃣ Book appointment
      const response = await fetch(bookAppointmentApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
  
      const result = await response.json();
      console.log("Booking Response :::", result);
  
      if (!response.ok) {
        alert(result.error || "Booking failed");
        return;
      }
  
      const bookingId = result.booking_id;
  
      // 2️⃣ Upload prescriptions if available
      if (prescription?.length > 0) {
        for (const file of prescription) {
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
  
      // 3️⃣ Navigate to booking status
      navigate("/booking-status", { 
        state: { 
          ...result, 
          serviceTitle, 
          serviceImage, 
          selectedDate,
          name:storedUser.name,
          email: storedUser.email, 
          phone: storedUser.phone 
        } 
      });
      
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert("Something went wrong, please try again.");
    }
  };
  

  return (
    <>
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto", backgroundColor: "#fff", mt: "10px",border: "2px solid #008080" ,borderRadius: "8px",}}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
        </IconButton>
      <Typography variant="h5" sx={{ mb: 2, color: "#004d4d", fontWeight: 700 }}>
        PAYMENT METHOD
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
        Choose Your Payment Method
      </Typography>

      <Stack spacing={2}>
        {paymentOptions.map((option) => {
          const isSelected = selected === option.id;
          return (
            <Paper
              key={option.id}
              variant="outlined"
              onClick={() => setSelected(option.id)}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: isSelected ? "#008080" : "#ccc",
                backgroundColor: isSelected ? "#E6F7F7" : "#fff",
                cursor: "pointer",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                {option.icon}
                <Typography>{option.label}</Typography>
              </Stack>
              <Radio
                checked={isSelected}
                value={option.id}
                onChange={() => setSelected(option.id)}
                sx={{ color: "#008080", "&.Mui-checked": { color: "#008080" } }}
              />
            </Paper>
          );
        })}
      </Stack>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#008080",
            alignItems: "center",
            "&:hover": { backgroundColor: "#006666" },
          }}
          onClick={handleContinue}
        >
          Save & Continue
        </Button>
</Box>

    </Box>
    <Footer/>
    </>
  );
};

export default PaymentMethodSelection;
