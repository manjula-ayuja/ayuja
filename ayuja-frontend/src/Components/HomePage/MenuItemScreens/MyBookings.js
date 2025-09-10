

import React, { useEffect, useState } from "react";
import {
  Box,Typography,Card,CardContent,Grid,Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,Rating,Link,Container,MenuItem,Select,FormControl,InputLabel,Avatar,CardHeader,IconButton,
} from "@mui/material";
import Footer from "../../Common/Footer";
import manImg from "../../Logos/GenderImages/man.png";
import womanImg from "../../Logos/GenderImages/girl.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

const MyBookingsScreen = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
    category: "",
  });

  const BOOKED_SERVICES_API = process.env.REACT_APP_BOOKED_SERVICES_API;
  const complaintsAPI = process.env.REACT_APP_COMPLAINTS_API;
  const feedbackAPI = process.env.REACT_APP_SERVICE_FEEDBACK_API;
  const updateBookingApi = process.env.REACT_APP_UPDATE_BOOKINGS
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
    setFormData({ rating: 0, comment: "", category: "" });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedBooking(null);
  };

  const handleSubmit = async () => {
    if (!selectedBooking) return;

    let endpoint = "";
    let payload = {};
    let method = "POST"; // default

    if (dialogType === "complaint") {
      endpoint = `${complaintsAPI}/${selectedBooking.booking_id}`;
      payload = {
        resident_id: user.user_id,
        rating: formData.rating,
        comment:
          formData.category === "other"
            ? formData.comment
            : `${formData.category} - ${formData.comment}`,
        category: formData.category,
        status: "open",
      };
    } else if (dialogType === "reschedule") {
      endpoint = `${updateBookingApi}/${selectedBooking.booking_id}`;
      payload = { date: formData.date, notes: formData.comment ,action: "reschedule"};
      method = "PUT"; // update booking
    } else if (dialogType === "cancel") {
      endpoint = `${updateBookingApi}/${selectedBooking.booking_id}`;
      payload = { action: "cancel",status: "cancelled" };
      method = "PUT";
    } else {
      // feedback
      endpoint = `${feedbackAPI}/${selectedBooking.booking_id}`;
      payload = { rating: formData.rating, comment: formData.comment };
    }

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        handleCloseDialog();

        // update local state for reschedule / cancel
        if (dialogType === "reschedule") {
          setBookings((prev) =>
            prev.map((b) =>
              b.booking_id === selectedBooking.booking_id
                ? { ...b, date: formData.date, notes: formData.comment }
                : b
            )
          );
        }
        if (dialogType === "cancel") {
          setBookings((prev) =>
            prev.map((b) =>
              b.booking_id === selectedBooking.booking_id
                ? { ...b, status: "cancelled" }
                : b
            )
          );
        }
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4, mb: 10 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
        </IconButton>

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
                  justifyContent: "space-between",
                  backgroundColor: "#F2FFF5",
                  alignItems: "center",
                  borderRadius: 3,
                  boxShadow: 4,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.03)" },
                  height: 400,
                  width: 400,
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "transparent", width: 96, height: 96 }}>
                      <img
                        src={b.booking?.gender === "Male" ? manImg : womanImg}
                        alt={b.booking?.gender}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Avatar>
                  }
                  title={`${b.service_type}`}
                  subheader={`Status: ${b.status}`}
                />
                <CardContent>
                  <Typography>
                    Booking Date: {new Date(b.date).toLocaleString()}
                  </Typography>
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
                      sx={{ color: "#006D77" }}
                      onClick={() => handleOpenDialog("feedback", b)}
                    >
                      Give Feedback
                    </Link>
                    <Link
                      component="button"
                      underline="always"
                      sx={{ color: "#006D77" }}
                      onClick={() => handleOpenDialog("complaint", b)}
                    >
                      Raise Complaint
                    </Link>
                    <Link
                      component="button"
                      underline="always"
                      sx={{ color: "#006D77" }}
                      onClick={() => handleOpenDialog("reschedule", b)}
                    >
                      Reschedule
                    </Link>
                    {b.status !== "cancelled" && (
                    <Link
                      component="button"
                      underline="always"
                      sx={{ color: "red" }}
                      onClick={() => handleOpenDialog("cancel", b)}
                      disabled={b.status === "cancelled"}
                    >
                      Cancel
                    </Link>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {dialogType === "complaint" && "Raise Complaint"}
            {dialogType === "feedback" && "Give Feedback"}
            {dialogType === "reschedule" && "Reschedule Booking"}
            {dialogType === "cancel" && "Cancel Booking"}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              {/* Feedback Case */}
              {dialogType === "feedback" && (
                <>
                  <Typography gutterBottom>Rating</Typography>
                  <Rating
                    value={formData.rating}
                    onChange={(e, newValue) =>
                      setFormData({ ...formData, rating: newValue })
                    }
                  />
                  <TextField
                    label="Comments"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mt: 2 }}
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                  />
                </>
              )}

              {/* Complaint Case */}
              {dialogType === "complaint" && (
                <>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <MenuItem value="service delay">Service Delay</MenuItem>
                      <MenuItem value="staff issue">Staff Issue</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  {formData.category === "other" && (
                    <TextField
                      label="Enter Custom Category"
                      fullWidth
                      sx={{ mt: 2 }}
                      value={formData.customCategory || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customCategory: e.target.value,
                        })
                      }
                    />
                  )}
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mt: 2 }}
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                  />
                </>
              )}

              {/* Reschedule Case */}
              {dialogType === "reschedule" && (
                <>
                  <Typography gutterBottom>
                    Reschedule Service: <b>{selectedBooking?.service_type}</b>
                  </Typography>
                  <TextField
                    label="Select New Date & Time"
                    type="datetime-local"
                    fullWidth
                    sx={{ mt: 2 }}
                    InputLabelProps={{ shrink: true }}
                    value={formData.date || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                  <TextField
                    label="Notes (Optional)"
                    fullWidth
                    multiline
                    rows={2}
                    sx={{ mt: 2 }}
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                  />
                </>
              )}

              {/* Cancel Case */}
              {dialogType === "cancel" && (
                <Typography>
                  Are you sure you want to cancel this booking?
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} sx={{ color: "#006D77" }}>
              Close
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ backgroundColor: dialogType === "cancel" ? "red" : "#006D77" }}
            >
              {dialogType === "cancel" ? "Yes, Cancel" : "Submit"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </>
  );
};

export default MyBookingsScreen;
