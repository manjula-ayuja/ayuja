
import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box,
} from "@mui/material";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/bookings");

    ws.onopen = () => console.log("WebSocket opened");
    ws.onmessage = (event) => {
      console.log("Received data:", event.data);
      try {
        const parsedData = JSON.parse(event.data);
        if (Array.isArray(parsedData)) {
          setBookings(parsedData);
        } else {
          console.warn("Received data is not an array");
        }
      } catch (err) {
        console.error("Error parsing WebSocket data:", err);
      }
      ws.send("next"); // Request next update
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    ws.onclose = () => console.log("WebSocket closed");

    return () => ws.close();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Bookings Dashboard
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="bookings table">
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>Resident ID</TableCell>
              <TableCell>Service Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Staff ID</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Invoice URL</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {bookings.map((b, i) => (
              <TableRow key={i} hover>
                <TableCell>{b.booking_id}</TableCell>
                <TableCell>{b.resident_id}</TableCell>
                <TableCell>{b.service_type}</TableCell>
                <TableCell>{b.date}</TableCell>
                <TableCell>{b.status}</TableCell>
                <TableCell>{b.staff_id}</TableCell>
                <TableCell>{b.notes}</TableCell>
                <TableCell>
                  {b.invoice_url ? (
                    <a href={b.invoice_url} target="_blank" rel="noopener noreferrer">
                      Invoice Link
                    </a>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>{b.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
