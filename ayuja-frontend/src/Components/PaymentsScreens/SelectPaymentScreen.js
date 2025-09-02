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

  const {
    name,
    dob,
    phone,
    gender,
    selectedDate,
    serviceTitle,
    serviceImage,
  } = location.state || {};  

  const handleContinue = () => {
    let bookingData = {
      serviceTitle,
      serviceImage,
      selectedDate,
      name,
      dob,
      phone,
      gender,
    };
console.log("booking data:::",bookingData)
    if (selected === "5") {
      bookingData.status = "success";
    } else if (selected === "2") {
      bookingData.status = "cancelled";
    } else if (selected === "4") {
      bookingData.status = "failed";
    } else {
      bookingData.method = selected;
    }

    // ✅ Navigate to BookingStatusScreen with state
    navigate("/booking-status", { state: bookingData });
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
