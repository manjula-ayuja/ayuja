import React from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";

const BookAppointment = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        top: 0,
        height: "50vh",
        width: 350,
        backgroundColor: "#075372",
        color: "#fff",
        p: 3,
        overflowY: "auto", 
        borderRadius:"30px"
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
        Book Appointment
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
        Full Name
      </Typography>
      <TextField
        placeholder="Enter Your Full Name"
        variant="outlined"
        fullWidth
        sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
      />
      <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
        Email Address
      </Typography>
      <TextField
        placeholder="Enter Your Email Address"
        variant="outlined"
        fullWidth
        sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
      />
      <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
        Phone 
      </Typography>
      <TextField
        placeholder="Enter Your Mobile Number"
        variant="outlined"
        fullWidth
        sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
      />

      <FormControlLabel
        control={<Checkbox sx={{ color: "white" }} />}
        label={
          <Typography variant="body2">
            I accept all <span style={{ color: "#4caf50" }}>terms and condition</span>
          </Typography>
        }
      />

      <Box textAlign="center" mt={2}>
        <Button
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
  );
};


export default BookAppointment;


