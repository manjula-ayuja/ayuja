


import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Link,Container
} from "@mui/material";
import Footer from "../../Common/Footer"
const RaiseComplaintScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "feedback" | "complaint"
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [formData, setFormData] = useState({ rating: 0, comment: "" });
  const BOOKED_SERVICES_API = process.env.REACT_APP_BOOKED_SERVICES_API;
  const compalintsAPI= process.env.REACT_APP_COMPLAINTS_API
  const feedbackAPI = process.env.REACT_APP_SERVICE_FEEDBACK_API
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        const params = new URLSearchParams({
          email: user.email,
          phone: user.phone,
        });
        // const res = await fetch(
        //   `http://localhost:5001/api/booking/my-bookings?${params}`
        // );
        const res = await fetch(`${BOOKED_SERVICES_API}?${params}`);
        const data = await res.json();
        if (res.ok) setBookings(data.bookings || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchBookings();
  }, [user]);

  const handleOpenDialog = (type, booking) => {
    setDialogType(type);
    setSelectedBooking(booking);
    setFormData({ rating: 0, comment: "" });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedBooking(null);
  };

  const handleSubmit = async () => {
    if (!selectedBooking) return;

      const endpoint =
        dialogType === "complaint"
          ? `${compalintsAPI}/${selectedBooking.booking_id}`
          : `${feedbackAPI}/${selectedBooking.booking_id}`;
    const payload =
      dialogType === "complaint"
        ? {
            resident_id: user.user_id,
            rating: formData.rating,
            comment: formData.comment,
            category: "service issue",
          }
        : { rating: formData.rating, comment: formData.comment };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        handleCloseDialog();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4, mb:10}}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "900", color: "#22577A", mb: 4, mt: 2 }}
        >
          Booked Services
        </Typography>
      <Grid container spacing={2}>
        {bookings.map((b) => (
          <Grid item xs={12} md={6} key={b.booking_id}>
             <Card
               sx={{
                 display: "flex",
                 flexDirection: "column",
                 justifyContent: "space-between",backgroundColor:"#F2FFF5",
                 alignItems: "center",
                 borderRadius: 3,
                 boxShadow: 4,
                 cursor: "pointer",
                 transition: "transform 0.2s",
                 "&:hover": { transform: "scale(1.03)" },height: 350,
                 width: 400,
               }} 
             >
              <CardContent>
                <Typography variant="h6" sx={{fontWeight: "500", color: "#22577A", mb: 4, mt: 2}}>{b.service_type}</Typography>
            
                <Typography>Booking Date: {new Date(b.date).toLocaleString()}</Typography>
                <Typography>Name: {b.resident?.name}</Typography>
                <Typography>Age: {b.age}</Typography>
                <Typography>Gender: {b.gender}</Typography>
                <Typography>Status: {b.status}</Typography>
                <Typography>
                Payment: {b.payment?.status} ({b.payment?.method})
                </Typography>
                <Typography>Amount: ₹{b.payment?.amount}</Typography>


                {/* Links */}
                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                  <Link
                    component="button"
                    underline="always"
                    onClick={() => handleOpenDialog("feedback", b)}
                  >
                    Give Feedback
                  </Link>
                  <Link
                    component="button"
                    underline="always"
                    onClick={() => handleOpenDialog("complaint", b)}
                  >
                    Raise Complaint
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === "complaint" ? "Raise Complaint" : "Give Feedback"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography gutterBottom>Rating</Typography>
            <Rating
              value={formData.rating}
              onChange={(e, newValue) => setFormData({ ...formData, rating: newValue })}
            />
            <TextField
              label="Comments"
              fullWidth
              multiline
              rows={3}
              sx={{ mt: 2 }}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    <Footer/>
    </>
  );
};

export default RaiseComplaintScreen;
