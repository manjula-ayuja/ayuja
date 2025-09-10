

import React, { useEffect, useState } from "react";
import {
  Box, Typography, Table, TableContainer, TableHead,
  TableRow, TableBody, TableCell, Paper, Link
} from "@mui/material";
import Footer from "../Common/Footer"
const PRIMARY_BG = "#eaf6f6";
const ACCENT_GREEN = "#21816b";
export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const totalBookingApi = process.env.REACT_APP_WS_BOOKINGS; 

  // WebSocket connection for bookings
  useEffect(() => {
    // const ws = new WebSocket("ws://localhost:5001/api/booking/ws/booking");
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

    // Cleanup on unmount
    return () => ws.close();
  }, []);

  
  const DataTable = ({ data }) => (
    <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {["Name", "Age", "Service Type", "Gender", "Date","Payment Amount", "Payment Status"].map(
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
              <TableCell>{row.payment_amount ?? "-"}</TableCell>
              <TableCell>{row.payment_status ?? "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return (
    <>
    <Box sx={{ bgcolor: PRIMARY_BG, py: 4 ,}}>
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
    <Footer/>
    </>

  );
}
