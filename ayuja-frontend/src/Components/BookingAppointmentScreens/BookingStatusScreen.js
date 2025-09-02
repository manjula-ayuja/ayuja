import React from "react";
import {
  Box,IconButton,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Footer from "../Common/Footer"
const BookingStatusScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get params from navigation
  const {
    status,
    serviceTitle,
    serviceImage,
    selectedDate,
  } = location.state || {};

  console.log("dadarrra::::",status,serviceImage,serviceTitle,selectedDate)
  const isSuccess = status === "success";
  const isCancelled = status === "cancelled";
  const isFailed = status === "failed";

  return (
    <>

     <Box sx={{ p: 4, maxWidth: 600, mx: "auto", backgroundColor: "#fff", mt: "100px" }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
        </IconButton>
      <Card sx={{ maxWidth: 500, width: "100%", borderRadius: 4, boxShadow: 4 }}>
        {serviceImage && (
          <CardMedia
            component="img"
            image={serviceImage}
            alt={serviceTitle}
            sx={{ height: 160, objectFit: "contain", p: 2 }}
          />
        )}

        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ color: "#2e5d63", mb: 1 }}>
            {serviceTitle}
          </Typography>

          {isSuccess && (
            <>
              <Typography variant="h5" sx={{ color: "#17494d", fontWeight: 700 }}>
                Appointment Booked ✅
              </Typography>
              <Typography sx={{ mt: 1, color: "#4a6c70" }}>
                Please check the app carefully to keep your health better.
              </Typography>
              <Typography sx={{ mt: 2, fontWeight: 600, color: "#17494d" }}>
                Booking Scheduled
              </Typography>
              <Typography sx={{ color: "#17494d" }}>{selectedDate}</Typography>
            </>
          )}

          {isFailed && (
            <>
              <Typography variant="h5" sx={{ color: "red", fontWeight: 700 }}>
                Booking Failed ❌
              </Typography>
              <Typography sx={{ mt: 1, color: "#4a6c70" }}>
                Something went wrong, please go back and check your booking again.
              </Typography>
            </>
          )}

          {isCancelled && (
            <>
              <Typography variant="h5" sx={{ color: "orange", fontWeight: 700 }}>
                Booking Cancelled ⚠️
              </Typography>
              <Typography sx={{ mt: 1, color: "#4a6c70" }}>
                Your booking has been cancelled. You can rebook anytime from the
                services page.
              </Typography>
            </>
          )}
        </CardContent>

        <Box sx={{ p: 2, textAlign: "center" }}>
          <Button
            // fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#006d67",
              "&:hover": { backgroundColor: "#00524d" },
              borderRadius: 2,
              py: 1.5,
              fontWeight: 600, alignItems: "center",
            }}
            onClick={() => navigate("/services")}
          >
            {isSuccess ? "Back to Home 🏠" : "Back"}
          </Button>
        </Box>
      </Card>
    </Box>
    <Footer/>
    </>
  );
};

export default BookingStatusScreen;
