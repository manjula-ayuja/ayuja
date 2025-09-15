
import React, { useEffect, useState } from "react";
import {
  Box, Typography, Table, TableContainer, TableHead,
  TableRow, TableBody, TableCell, Paper, Select,
  MenuItem, FormControl, InputLabel, Dialog,
  DialogActions, DialogContent, DialogContentText,
  DialogTitle, Button
} from "@mui/material";
// import Footer from "../Common/Footer";
import axios from "axios";

const PRIMARY_BG = "#eaf6f6";
const ACCENT_GREEN = "#21816b";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    bookingId: null,
    newStatus: "",
  });

  const totalBookingApi = process.env.REACT_APP_WS_BOOKINGS; 
  const updateBookingApi = process.env.REACT_APP_UPDATE_BOOKINGS
  useEffect(() => {
    const ws = new WebSocket(totalBookingApi);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) setBookings(data);
      } catch (e) {
        console.error("Bookings WS message parse error", e);
      }
    };

    ws.onclose = () => console.log("Bookings WS closed");
    ws.onerror = (e) => console.error("Bookings WS error", e);

    return () => ws.close();
  }, [totalBookingApi]);

  const handleStatusChange = (bookingId, newStatus) => {
    // Open confirmation dialog instead of directly updating
    setConfirmDialog({ open: true, bookingId, newStatus });
  };

  const confirmStatusUpdate = async () => {
    const { bookingId, newStatus } = confirmDialog;
    setLoading(true);          // start loading
    setSuccessMessage("");     // reset previous messages
  
    try {
      // Optimistic UI update
      setBookings((prev) =>
        prev.map((b) => (b.booking_id === bookingId ? { ...b, status: newStatus } : b))
      );
  
      const resp = await axios.put(
        `${updateBookingApi}/${bookingId}`,
        { action: "status", status: newStatus },
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (resp.status === 200) {
        const updated = resp.data.booking;
        setBookings((prev) =>
          prev.map((b) => (b.booking_id === bookingId ? { ...b, ...updated } : b))
        );
  
        setSuccessMessage(`Booking status updated to "${newStatus}" successfully!`);
      }
    } catch (err) {
      console.error("Error updating booking status", err);
      setSuccessMessage("Failed to update booking status.");
    } finally {
      setLoading(false);  // stop loading
    }
  };
  
  

  const cancelStatusUpdate = () => {
    setConfirmDialog({ open: false, bookingId: null, newStatus: "" });
  };

  const DataTable = ({ data }) => (
    <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {["Name", "Age", "Service Type", "Gender", "Date", "Payment Amount", "Payment Status", "Action"].map(
              (label) => <TableCell key={label}>{label}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx} hover>
              <TableCell>{row.resident_name ?? "-"}</TableCell>
              <TableCell>{row.age ?? "-"}</TableCell>
              <TableCell>{row.service_type ?? "-"}</TableCell>
              <TableCell>{row.gender ?? "-"}</TableCell>
              <TableCell>{row.date ? new Date(row.date).toLocaleString() : "-"}</TableCell>
              <TableCell>{row.payment?.amount ?? row.payment_amount ?? "-"}</TableCell>
              <TableCell>{row.payment?.status ?? row.payment_status ?? "-"}</TableCell>

              {/* Only Dropdown (default = row.status) */}
              <TableCell>
                <FormControl fullWidth size="small">
                  <InputLabel id={`status-label-${row.booking_id}`}>Status</InputLabel>
                  <Select
                    labelId={`status-label-${row.booking_id}`}
                    value={row.status || "new"}
                    label="Status"
                    onChange={(e) => handleStatusChange(row.booking_id, e.target.value)}
                  >
                    <MenuItem value="new">New</MenuItem>
                    <MenuItem value="assigned">Assigned</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                    <MenuItem value="rescheduled">Rescheduled</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <>
      <Box sx={{ bgcolor: PRIMARY_BG, py: 4 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
          <Typography variant="h3" fontWeight="800" sx={{ color: ACCENT_GREEN }}>
            Admin Dashboard
          </Typography>
          <Typography sx={{ mb: 2, mt: 1, color: "#555" }}>
            Monitor and manage all bookings here.
          </Typography>
          <DataTable data={bookings} />
        </Box>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onClose={cancelStatusUpdate}>
  <DialogTitle>
    {successMessage ? "Success" : loading ? "Updating..." : "Confirm Status Update"}
  </DialogTitle>
  <DialogContent>
    {loading ? (
      <DialogContentText>Updating status, please wait...</DialogContentText>
    ) : successMessage ? (
      <DialogContentText sx={{ color: "green" }}>
        {successMessage}
      </DialogContentText>
    ) : (
      <DialogContentText>
        Are you sure you want to change the status to <b>{confirmDialog.newStatus}</b>?
      </DialogContentText>
    )}
  </DialogContent>
  <DialogActions>
    <Button 
      onClick={cancelStatusUpdate} 
      color={successMessage ? "primary" : "error"} 
      disabled={loading}       
    >
      {successMessage ? "Close" : "Cancel"}
    </Button>
    {!successMessage && (
      <Button 
        onClick={confirmStatusUpdate} 
        color="primary" 
        variant="contained" 
        disabled={loading}     
      >
        Confirm
      </Button>
    )}
  </DialogActions>
</Dialog>



      {/* <Footer /> */}
    </>
  );
}
