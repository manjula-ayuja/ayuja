import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import sosImage from "../../Logos/SOS.png";


const SOSScreen = () => {
  const handleCall = () => {
    window.location.href = "tel:+919876543210";
  };

  return (
    <Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          mt: 4,
        }}
      >
        <Card
          sx={{
            width: "90%",
            maxWidth: 500,
            borderRadius: 4,
            backgroundColor: "#BDCDD7",
            p: 3,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
          >
            SOS
          </Typography>

          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              borderRadius: 2,
              backgroundColor: "#fff",
            }}
          >
            <Avatar
              src={sosImage}
              alt="SOS"
              sx={{ width: 60, height: 60, mr: 2, bgcolor: "#006D77" }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Call Support
              </Typography>
              <Button
                onClick={handleCall}
                sx={{
                  color: "#0056A0",
                  fontWeight: "bold",
                  textTransform: "none",
                  p: 0,
                }}
              >
                +91 9876543210
              </Button>
            </Box>
          </Card>
        </Card>
      </Box>
    </Box>
  );
};



export default SOSScreen;